var path = require('path')
var fs = require('fs')

exports.index = function(req, res, next) {
  res.render('index')
}

exports.upload = function (req, res, next) {
  fs.readFile(req.files.file.path, function (err, data) {
    if (err)
      throw err

    var extname = path.extname(req.files.file.name).toLowerCase()
    var destination = path.join(__dirname, '..', '..', 'public', 'i', 'uploads', 
    	Date.now().toString() + extname)

     fs.writeFile(destination, data, function (err) {
       if(err)
         throw err
      fs.unlink(req.files.file.path, function(err) {
      	if(err)
      		throw err
      	res.end()
      })
    })
  })
}