var path = require('path')
var fs = require('fs')
var im = require('node-imagemagick')
var async = require('async')

var SIZES = [800, 640, 320]

var createPath = function() {
  var arr = [__dirname, '..', '..', 'public', 'i', 'uploads'].concat( [].slice.call(arguments) )
  return path.join.apply(null, arr)
}

var resize = function(src, name, sz, cb) {
  var dst = createPath(sz.toString(), name)
  im.resize({
    srcPath: src,
    dstPath: dst,
    width: sz,
    height: sz,
    sharpening: 0.2,
    progressive: true,
    quality: 0.7
  }, function(err, stdout, stderr) {
    if (err) throw err
    cb()
  })
  return dst
}

exports.upload = function(req, res, next) {
  fs.readFile(req.files.file.path, function (err, data) {
    if (err) throw err

    var name = Date.now().toString() + path.extname(req.files.file.name).toLowerCase()
    var original = createPath('original', name)
    var features = {}

    fs.writeFile(original, data, function (err) {
      if (err) throw err
      fs.unlink(req.files.file.path, function(err) {
     	  if (err) throw err

        im.identify(original, function(err, features) {
          if(err) throw err

          async.series(
            SIZES.map(function(sz) {
              return function(cb) {
                original = resize(original, name, sz, cb)
              }
            }), function(err) {
              if (err) throw err
              res.send({ name: name, features: features })
            }
          )
        })
      })
    })
  })
}