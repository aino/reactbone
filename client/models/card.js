var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  defaults: {
    date: null,
    summary: '',
    slug: '',
    published: false,
    thumb: null,
    type: '',
    typetitle: ''
  },
  isEmpty: function() {
  	var hasSummary = this.get('summary') && this.get('summary').trim()
    var hasThumb = !!this.get('thumb')
    if ( hasSummary || hasThumb )
        return false
    return true
  }
})