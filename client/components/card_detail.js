/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var ImageComponent = require('./image')
var ModalComponent = require('./modal')
var EditorComponent = require('./editor')
var Router = require('../router')
var globals = require('../globals')
var htmlToBr = require('../lib/aino/htmltobr')

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

  },

  closeHandler: function() {
    Router.navigate('/', { trigger: true })
  },

  imageUploadHandler: function(imageObj) {

    var card = this.props.card
    this.componentDidUpdate()

    var set = {
      image: imageObj
    }

    // copy to thumbnail if empty or same
    if ( !card.get('thumb') || card.get('thumb').name === card.get('image').name )
      set.thumb = imageObj

    card.set(set).save()
  },

  captionUpdateHandler: function(html, text) {

    var card = this.props.card

    var set = {
      caption: html
    }

    // copy to summary if empty or same
    if ( !card.get('summary') || card.get('summary') === htmlToBr(card.get('caption')) )
      set.summary = text

    this.props.card.set(set, { silent: true }).save()
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
    var card = this.props.card
    var captionType = card.get('captionType')

    if ( captionType )
      classNames.push('caption-'+captionType)

    if(globals.get('editmode')) {
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
    }

    return (
      <ModalComponent closeHandler={this.closeHandler}>
        <div className={classNames.join(' ')} ref="card">
          {tools}
          <ImageComponent onChange={this.imageUploadHandler} className="card-image" image={card.get('image')} />
          <div className="card-content">
            <EditorComponent onChange={this.captionUpdateHandler} content={card.get('caption')} placeHolder="Enter a caption" />
            {caption}
          </div>
        </div>
      </ModalComponent>
    )
  }
})