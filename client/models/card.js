var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  defaults: {
    caption: '',
    captiontype: '',
    slug: '',
    image: null,
    published: false
  },
  isEmpty: function() {
  	var hasCaption = !!this.get('caption').trim()
  	var hasImage = !!this.get('image')
  	if ( hasCaption || hasImage )
  		return false
  	return true
  }
})