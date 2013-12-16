/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Medium = require('../lib/aino/medium')
var ImageComponent = require('./image')
var ModalComponent = require('./modal')
var rangy = require('rangy')
var Router = require('../router')

var interval;

module.exports = React.createClass({

  getInitialState: function() {
    return { editing: false }
  },

  componentDidMount: function(elem) {
    this.componentDidUpdate(elem)
  },

  componentDidUpdate: function() {

    var card = this.props.card

    if ( !card )
      throw '404'

    var self = this

    var elem = this.refs.caption.getDOMNode()

    if ( !this.state.editing ) {
      elem.innerHTML = card.get('caption')
      return
    }

    card.hasChanged = false

    var type = elem.getAttribute('data-type')
    var opts = {
      placeholder: 'Enter a '+type
    }

    var m = Medium( elem, opts )
    var data = card.get( type )

    data && m.setContent(data)
    
    m.change(function(html) {
      self.changeHandler.call(self, elem, html)
    })

    $(elem).focus()

    rangy.addInitListener(function() {
      var range = rangy.createRange()
      range.selectNodeContents(elem)
      range.collapse(false)
      var sel = rangy.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
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

  cleanUp: function(html) {

    html = $.trim(html)
    if( !$('<div>').html(html).text() )
      return ''

    // remove empty last paragraphs
    return $.trim( html.replace(/(<p>\s*<br>\s*<\/p>)+$/, '') )

  },

  changeHandler: function(elem, html) {
    var set = {}

    set[elem.getAttribute('data-type')] = this.cleanUp(html)
    this.props.card.set(set, {
      silent: true
    })
    this.props.card.hasChanged = true
  },

  closeHandler: function() {
    if ( this.state.editing )
      return
    Router.navigate('/', { trigger: true })
  },

  editAction: function() {
    this.setState({ editing: true })
  },

  doneAction: function() {
    this.setState({ editing: false })
  },

  render: function() {

    var tools
    var caption

    if(this.state.editing) {
      tools = <button onClick={this.doneAction}>Done</button>
      caption = <div key="editable" ref="caption" className="editable content" data-type="caption" />
    } else {
      tools = <button onClick={this.editAction}>Edit card</button>
      caption = <div key="static" ref="caption" className="content" />
    }

    return (
      <ModalComponent closeHandler={this.closeHandler}>
        <div className='card-detail'>
          <div className={this.state.editing ? 'active card-toolbar' : 'card-toolbar'}>
            {tools}
          </div>
          <div className="card-content">
            {caption}
          </div>
          <ImageComponent className="card-image" upload={this.state.editing} card={this.props.card} />
        </div>
      </ModalComponent>
    )
  }
})