var assets = require('../conf/assets')
  , db = require('../conf/db')


exports.bundles = function(req, res, next) {
  db.rediscli.hgetall('bundles', function(err, hash) {
    res.locals.bundles = res.locals.bundles || {}
    var updateLocalsJS = function(name, url) {
        var v = hash[name] ? '?' + hash[name] : ''
        res.locals.bundles[name] = '<script src="' + url + v + '"></script>'
    }
    updateLocalsJS(assets.libsMeta.name, assets.libsMeta.url)
    assets.apps.forEach(function(c){
      updateLocalsJS(c.name, c.url)
    })
    next()
  })
}

