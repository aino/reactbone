var Backbone = require('backbone')
//  , Store = require('store')
  , Card = require('../models/card')


module.exports = Backbone.Collection.extend({
    model: Card
    //localStorage: new Store('cards')
})
