var Backbone = require('backbone')
  , Store = require('../../bower_components/Backbone.localStorage/Backbone.localStorage') // this needs to be fixed
  , Card = require('../models/card')


module.exports = Backbone.Collection.extend({
    model: Card
    //localStorage: new Store('cards')
})
