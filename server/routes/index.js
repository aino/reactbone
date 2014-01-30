var uploader = require('./uploader')
var twitter = require('ntwitter')

exports.index = function(req, res, next) {
  res.render('index')
}

exports.upload = uploader.upload

exports.twitter = function(req, res, next) {
  var user = req.query.user
  if (!user)
    return res.send({ data: null })
  var twit = new twitter({
    consumer_key: 'xWQkhxqAMSlGYTXRtDKS0Q',
    consumer_secret: 'AZaAupUWryJosHvehLWWrK20OmwXOJtmWKvDCIBLwc',
    access_token_key: '14638217-cTgavbqL4FJLnTX9NvUzIbNqEEU9HOcFDJ9wCGvy6',
    access_token_secret: 'mFos5BHw3BsA9GU6RCk0eADkwYgncNgIwKzuN5OiTxGta'
  })
  twit.get('/statuses/user_timeline.json', {
    screen_name: user
  }, function(i, data) {
    res.send({ data: data })
  })
}