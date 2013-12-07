/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Medium = require('../lib/aino/medium')
var UploadComponent = require('./fileupload')
var Rangy = require('rangy')

var interval;

module.exports = React.createClass({

  componentDidMount: function(elem) {

    var card = this.props.card ||  this.props.cards.create({
      content: '',
      slug: Date.now().toString()
    })

    card.hasChanged = false

    var self = this

    $(elem).find('.editable').each(function(i) {

      var m = Medium(this)
      if ( card.get('content') ) {
        m.setContent(card.get('content'))
      }
      var elem = this
      m.change(function(html) {
        self.changeHandler.call(self, elem, card, html)
      })

      if (!i) {
        
        $(elem).focus()

        var range = rangy.createRange()
        range.selectNodeContents(elem)
        range.collapse(false)
        var sel = rangy.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    })

    interval = setInterval(function() {
      if ( card.hasChanged ) {
        card.save()
        card.hasChanged = false
      }
    }, 1000)

  },

  uploadHandler: function(img, data) {
    var image = new Image()
    image.src = '/public/i/uploads/'+data.result.name
    console.log(this.refs.image)
    this.refs.image.getDOMNode().appendChild(image)
  },

  componentWillUnmount: function() {
    clearInterval(interval)
  },

  changeHandler: function(elem, card, html) {

    card.set({
      content: html
    });

    card.hasChanged = true
  },

  render: function() {
    return(
      <div className="card-detail card-edit">
        <div className="image" ref="image"></div>
        <UploadComponent handler={this.uploadHandler} />
        <div className="editable"></div>
      </div>
    )
  }
})