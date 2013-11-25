/** @jsx React.DOM */
var React = require('react')
var CardComponent = require('../components/card')
var $ = require('jquery')
var masonry = require('../lib/masonry/masonry')

console.log(define, masonry)

module.exports = React.createClass({

  componentDidMount: function(ul) {
    console.log(ul)
    //this.masonry = new Masonry(ul)
  },

  componentWillUnmount: function() {
    //$(window).off('scroll resize', $(window).data('lazyHandler'))
  },

  render: function() {
    var scope = this
    var cards = this.props.cards.map(function(card) {
      return CardComponent({ card: card, key: Math.random() })
    })
    return (<ul ref="ul">{cards}</ul>)
  }
})