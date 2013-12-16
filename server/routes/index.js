var uploader = require('./uploader')

exports.index = function(req, res, next) {
  res.render('index')
}

exports.upload = uploader.upload