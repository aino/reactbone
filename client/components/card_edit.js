/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Medium = require('../lib/aino/medium')

module.exports = React.createClass({

  componentDidMount: function(elem) {
    var card
    if ( this.props.isnew ) {
      card = this.props.cards.create({
        content: '',
        slug: 'hex'
      },{
        wait: true
      })
    }
    var self = this

    $(elem).find('.editable').each(function() {
      var m = Medium(this)
      var elem = this
      m.change(function(html) {
        self.changeHandler.call(self, elem, card, html)
      })
    })
  },

  changeHandler: function(elem, card, html) {
    console.log(card)
    card.set({
      content: html
    })
  },

  render: function() {
    return(
      <div className="card-detail card-edit">
        <p className="editable"></p>
      </div>
    )
  }
})