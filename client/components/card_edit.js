/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Medium = require('../lib/aino/medium')
var Sanitizer = require('../lib/aino/sanitizer')

var interval;

module.exports = React.createClass({

  componentDidMount: function(elem) {

    var card = this.props.card ||  this.props.cards.create({
      content: '',
      slug: Date.now().toString()
    })

    card.hasChanged = false

    var self = this

    $(elem).find('.editable').each(function() {
      var m = Medium(this)
      if ( card.get('content') ) {
        m.setContent(card.get('content'))
      }
      var elem = this
      m.change(function(html) {
        self.changeHandler.call(self, elem, card, html)
      })
    })

    interval = setInterval(function() {
      if ( card.hasChanged ) {
        card.save()
        card.hasChanged = false
      }
    }, 1000)

  },

  componentWillUnmount: function() {
    clearInterval(interval)
  },

  changeHandler: function(elem, card, html) {
    var cleaner = new Sanitizer({ 
      elements:   ['a', 'b', 'i', 'h3', 'h4', 'blockquote', 'ul', 'li', 'pre'],
      attributes: { 
        a: ['href'], 
        span: ['class'] 
      },
      protocols:  { 
        a: { href: ['http', 'https', 'mailto'] }
      }
    })
    var fragment = cleaner.clean_node(elem)
    elem.innerHTML = ''
    elem.appendChild(fragment)
    html = elem.innerHTML

    card.set({
      content: html
    });

    card.hasChanged = true
  },

  render: function() {
    return(
      <div className="card-detail card-edit">
        <div className="editable"></div>
      </div>
    )
  }
})