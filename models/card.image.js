define(function(require) {
	
	var Backbone = require('backbone')
	var Card = require('models/card')

	return Card.extend({
	  defaults: {
	    image: 'imagecard placeholder'
	  }
	})
})