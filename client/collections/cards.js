var Backbone = require('backbone')
var Store = require('Backbone.localStorage')
var Card = require('../models/card')


module.exports = Backbone.Collection.extend({
    model: Card,
    localStorage: new Store('cards')
})