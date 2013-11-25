/** @jsx React.DOM */
var React = require('react')
var CardComponent = require('../components/card')
var $ = require('jquery')
var Masonry = require('../lib/aino/masonry')

var masonry = {};

module.exports = React.createClass({

  componentDidMount: function(ul) {
    if ( !masonry.hasOwnProperty('element') ) {
      masonry = new Masonry(ul, {
        width: 176
      })
    }
  },

  componentWillUnmount: function() {
    //$(window).off('scroll resize', $(window).data('lazyHandler'))
  },

  render: function() {
    var scope = this

    var cards = this.props.cards.map(function(card) {
      return CardComponent({ 
        card: card, 
        key: Math.random(), 
        masonry: masonry
      })
    })
    return (<ul ref="ul">{cards}</ul>)
  }
})