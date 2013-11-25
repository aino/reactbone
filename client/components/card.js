/** @jsx React.DOM */
var React = require('react')
var $ = require('jquery')

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
    handler()
  },

  componentWillUnmount: function() {
    $(window).off('scroll resize', $(window).data('lazyHandler'))
  },

  clickHandler: function() {
    console.log('clicked')
  },

  render: function() {
        
    var card = this.props.card

    return(
      <li>
        <img data-src="http://placekitten.com/g/140/140" src="#" />
        <h2>{card.get('title')}</h2>
        <p><strong>Hello: </strong>{ card.get('summary') }</p>
        <button onClick={this.clickHandler}>Click me</button>
      </li>
    )
  }
})


