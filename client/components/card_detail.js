/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Medium = require('../lib/aino/medium')
var ImageComponent = require('./image')
var ModalComponent = require('./modal')
var rangy = require('rangy')
var Router = require('../router')
var globals = require('../globals')

var interval;

module.exports = React.createClass({

  componentDidMount: function(elem) {
    this.componentDidUpdate()
  },

  componentDidUpdate: function() {

    var card = this.props.card

    if ( !card )
      throw '404'

    var self = this

    var $card = $(this.refs.card.getDOMNode())
    var width = $card.outerWidth()
    $card.closest('#modal').css({
      marginLeft: width/-2
    })

    if ( card.get('captionType') == 'bottom' )
      $card.css('width', $card.find('img').width())

    if ( !this.refs.caption )
      return

    var elem = this.refs.caption.getDOMNode()

    if ( !globals.isEditMode() ) {
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
    Router.navigate('/', { trigger: true })
  },

  imageHandler: function() {
    this.componentDidUpdate()
  },

  selectCaptionAction: function(e) {
    var val = e.target.value
    this.props.card.set({
      captionType: val
    })
  },

  render: function() {

    var tools
    var caption
    var classNames = ['card-detail']
    var captionType = this.props.card.get('captionType')

    if ( captionType )
      classNames.push('caption-'+captionType)

    if(globals.isEditMode()) {
      tools = (
        <div className="card-toolbar">
          <select onChange={this.selectCaptionAction} value={captionType}>
            <option value="">No caption</option>
            <option value="left">Left caption</option>
            <option value="right">Right caption</option>
            <option value="bottom">Bottom caption</option>
          </select>
        </div>
      )
      caption = <div key="editable" ref="caption" className="editable content" data-type="caption" />
    } else {
      caption = <div key="static" ref="caption" className="content" />
    }

    return (
      <ModalComponent closeHandler={this.closeHandler}>
        <div className={classNames.join(' ')} ref="card">
          {tools}
          <ImageComponent onChange={this.imageHandler} className="card-image" card={this.props.card} />
          <div className="card-content">
            {caption}
          </div>
        </div>
      </ModalComponent>
    )
  }
})