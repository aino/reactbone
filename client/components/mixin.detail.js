var $ = require('jquery')

module.exports = {

	componentDidMount: function() {
	  this.componentDidUpdate()
	},

	componentDidUpdate: function() {

	  if ( !this.props.card )
	    throw '404'

	  var self = this

	  var $card = $(this.refs.card.getDOMNode())
	  var width = $card.outerWidth()
	  $card.closest('#modal').css({
	    marginLeft: width/-2
	  })
  }
}