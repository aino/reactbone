var config = require('../conf/config')
  , mongo = require('mongoskin')
  , redis = require('redis')


// mongo
var mongocli = mongo.db(config.mongo.host + ':' +
    config.mongo.port + '/' +
    config.mongo.database,
    { safe: true }
    )
exports.mongocli = mongocli
exports.createFromHexString = mongocli.ObjectID.createFromHexString


// redis
var rediscli = redis.createClient(
  config.redis.port,
  config.redis.host || config.redis.socket
  )
rediscli.select( config.redis.database )
exports.rediscli = rediscli


exports.close = function() {
  mongocli.close()
  rediscli.quit()
}


