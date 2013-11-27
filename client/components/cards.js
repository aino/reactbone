/** @jsx React.DOM */
var React = require('react')
var CardComponent = require('../components/card')
var $ = require('jquery')
var Masonry = require('../lib/aino/masonry')

var masonry;

module.exports = React.createClass({

  componentDidMount: function(ul) {
    if ( !masonry ) {
      masonry = new Masonry(ul, {
        width: 164,
        gutter: 12
      })
    }
    var handler = function() {
      this.resizeHandler.call(this)
    }.bind(this)
    $(window).data('resizeHandler', handler).on('resize', handler)
    handler()
  },

  componentWillUnmount: function() {
    $(window).off('resize', $(window).data('resizeHandler'))
  },

  componentDidUpdate: function() {
    /*
    this.props.cards.forEach(function(card) {
      card.save()
    })
    */
  },

  resizeHandler: function() {
    masonry && masonry.layout()
  },

  render: function() {
    var scope = this

    var cards = this.props.cards.map(function(card, index) {
      return CardComponent({ 
        card: card, 
        key: card.cid, 
        masonry: masonry
      })
    })
    return (<ul ref="ul">{cards}</ul>)
  }
})