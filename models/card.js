define(function(require) {
	
	var Backbone = require('backbone');

	return Backbone.Model.extend({
	  defaults: {
	    listImage: '',
	    title: '',
	    summary: '',
	    content: ''
	  }
	})
})