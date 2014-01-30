var Backbone = require('backbone')
var Card = require('./card')

module.exports = Card.extend({
  defaults: {
    type: 'image',
    caption: '',
    captiontype: '',
    image: null
  }
})