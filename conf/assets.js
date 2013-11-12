var assets = require('./assets.json')
  , path = require('path')


var clientDir = path.join(__dirname, '..', 'client')
  , buildDir = path.join(__dirname, '..', 'public/build')


var App = function(opts) {
  var self = this
  self.name = opts.name
  self.src = path.join(clientDir, opts.src)
  self.dest = path.join(buildDir, opts.dest)
  self.url = opts.url || '/public/build/' + opts.dest
}

var Lib = function(opts) {
  var self = this
  self.name = opts.name
  self.opts = { expose: opts.name }
  self.src = opts.src && path.join(clientDir, opts.src)
  self.modulesDir = opts.modulesDir || 'bower_components'
  self.manifest = opts.manifest || 'bower.json'
  self.noParse = opts.noParse
  self.id = self.src || self.name
}

var apps = []
assets.apps.forEach(function(c) {
  apps.push(new App(c))
})

var libs = []
assets.libs.forEach(function(l) {
  libs.push(new Lib(l))
})

var libsMeta = {
    name: assets.libsMeta.name
  , dest: path.join(buildDir, assets.libsMeta.dest)
  , url: assets.libs.url || '/public/build/' + assets.libsMeta.dest
}


exports.apps = apps
exports.libs = libs
exports.libsMeta = libsMeta
