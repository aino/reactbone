var Backbone = require('backbone')
var Card = require('./card')

module.exports = Card.extend({
  defaults: {
    type: 'post',
    content: '',
    preamble: ''
  }
})