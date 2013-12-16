var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  defaults: {
    caption: '',
    slug: '',
    image: '',
    published: false
  },
  isEmpty: function() {
  	var hasCaption = !!this.get('caption').trim()
  	var hasImage = !!this.get('image').trim()
  	if ( hasCaption || hasImage )
  		return false
  	return true
  }
})