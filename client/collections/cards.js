var Backbone = require('backbone')
//var Store = require('../lib/backbone.localstore') // this needs to be fixed
var Card = require('../models/card')


module.exports = Backbone.Collection.extend({
    model: Card,
    //localStorage: new Store('cards')
})
