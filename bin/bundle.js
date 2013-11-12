#!/usr/bin/env node

var fs = require('fs')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , reactify = require('reactify').process
  , UglifyJS = require('uglify-js')
  , db = require('../conf/db')
  , crypto = require('crypto')
  , async = require('async')
  , apps = require('../conf/assets').apps
  , libs = require('../conf/assets').libs
  , libsMeta = require('../conf/assets').libsMeta


var bundleQue = async.queue(function(opts, callback) {
  opts.br.bundle({debug: opts.debug}, function(err, code) {
    if (err) {
      if (opts.debug) {
        console.error(String(err))
        return
      } else {
        throw err
      }
    }
    var sum = crypto.createHash('md5')
      , msg = ' with source maps.'
    if (!opts.debug) {
      code = UglifyJS.minify(code, {fromString: true}).code
      var msg = ''
    }
    fs.writeFile(opts.dest, code, function(err) {
      if (err) throw err
      console.log('Wrote ' + opts.dest + msg)
      sum.update(code)
      db.rediscli.hset('bundles', opts.name, sum.digest('hex'), function(err) {
        if (err) throw err
        callback()
      })
    })
  })
}, 4)



var bundleLibs = function(debug) {
  var noParse = []
    , lookup = {}
  libs.forEach(function(lib) {
    lookup[lib.id] = {
        modulesDir: lib.modulesDir
      , manifest: lib.manifest
    }
    if (lib.noParse) {
      noParse.push(lib.id)
    }
  })
  var br = browserify({noParse: noParse, lookup: lookup})
  libs.forEach(function(lib) {
    br.require(lib.id, lib.opts)
  })
  bundleQue.push({br: br, name: libsMeta.name, dest: libsMeta.dest, debug: debug})
}

var bundleApp = function(c, debug) {
  var br = browserify(c.src)
  libs.forEach(function(lib) {
    br.external(lib.name)
  })
  br.transform(reactify)
  bundleQue.push({br: br, name: c.name, dest: c.dest, debug: debug})
}


var listenApp = function(c, debug) {
  var w = watchify(c.src)
  libs.forEach(function(lib) {
    w.external(lib.name)
  })
  w.transform(reactify)
  w.on('update', function() {
    bundleQue.push({br: w, name: c.name, dest: c.dest, debug: debug})
  })
  bundleQue.push({br: w, name: c.name, dest: c.dest, debug: debug})
}


var bundle = function(all, debug) {
  if (all) {
    bundleLibs(debug)
  }
  apps.forEach(function(c) {
    bundleApp(c, debug)
  })
  bundleQue.drain = function() { db.close() }
}


var listen = function(debug) {
  apps.forEach(function(c) {
    listenApp(c, debug)
  })
}


if (require.main === module) {
  var argv = require('optimist').argv
  if (argv.listen) {
    listen(true)
  } else {
    bundle(argv.all, !!argv.debug)
  }
}


exports.bundle = bundle
exports.listen = listen
