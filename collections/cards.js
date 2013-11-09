define(function(require) {
	
	var Backbone = require('backbone')
	var Store = require('store')
	var Card = require('models/card')

	return Backbone.Collection.extend({
    	model: Card
    	//localStorage: new Store('cards')
  })
})