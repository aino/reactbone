var Backbone = require('backbone')
  , Card = require('./card')


module.exports = Card.extend({
  defaults: {
    image: 'imagecard placeholder'
  }
})
