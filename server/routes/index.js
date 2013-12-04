var path = require('path')
var fs = require('fs')

exports.index = function(req, res, next) {
  res.render('index')
}

exports.upload = function(req, res, next) {
  fs.readFile(req.files.file.path, function (err, data) {
    if (err)
      throw err

    var name = Date.now().toString() + path.extname(req.files.file.name).toLowerCase()
    var destination = path.join(__dirname, '..', '..', 'public', 'i', 'uploads', name)

     fs.writeFile(destination, data, function (err) {
       if(err)
         throw err
      fs.unlink(req.files.file.path, function(err) {
      	if(err)
      		throw err
      	res.send({ name: name })
      })
    })
  })
}