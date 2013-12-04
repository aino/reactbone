/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var ChangeListener = require('../lib/aino/changelistener')

module.exports = React.createClass({

  lazyLoad: function($li) {
    var limit = $(window).scrollTop() + $(window).height()
    var $img = $li.find('img')
    if ( $img.attr('src') === '#' && $li.offset().top < limit ) {
      $img.attr('src', $img.data('src'))
    }
  },

  componentDidMount: function(li) {

    var handler = function() {
      this.lazyLoad.call(this, $(li))
    }.bind(this)

    $(window).data('lazyHandler', handler).on('scroll resize', handler)

    if ( this.props.masonry ) {
      this.props.masonry.layout()
    }

    setTimeout(handler,100)

    var contentNode = $(li).find('p')[0]

    /*

    ChangeListener( contentNode, function(content) {
      this.props.card.set({
        content: content
      })
    }.bind(this), function() {
      return this.innerHTML
    })

    */

    //var editor = new MediumEditor([contentNode]);

  },

  componentDidUpdate: function() {
    if ( this.props.masonry ) {
      this.props.masonry.layout()
    }
  },

  componentWillUnmount: function() {
    $(window).off('scroll resize', $(window).data('lazyHandler'))
  },

  render: function() {
        
    var card = this.props.card

    return(
      <li>
        <p dangerouslySetInnerHTML={{__html: card.get('summary')}}></p>
      </li>
    )
  }
})


