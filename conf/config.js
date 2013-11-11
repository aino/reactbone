var _ = require('underscore')
  , configs = require('./config.json')


var env = process.env.NODE_ENV || 'development'
var config = _.clone(configs.global)
_.extend(config, configs[env])

config.env = env
config.port = process.env.PORT || config.port

module.exports = config
