var Backbone = require('backbone')
var Card = require('./card')

module.exports = Card.extend({
  defaults: {
    type: 'tweet',
    typetitle: 'twitter',
    id: null,
    image: null
  }
})