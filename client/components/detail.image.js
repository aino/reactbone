/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var EditorComponent = require('./editor')
var ImageComponent = require('./image')
var Router = require('../router')
var globals = require('aino/globals')
var htmlToBr = require('aino/htmltobr')
var MixinDetail = require('./mixin.detail')

module.exports = React.createClass({

  mixins: [ MixinDetail ],

  componentDidUpdate: function() {

    var card = this.props.card
    var $card = $(this.refs.card.getDOMNode())

    if ( card.get('captionType') == 'bottom' )
      $card.css('width', $card.find('img').width())

  },

  imageUploadHandler: function(imageObj) {

    var card = this.props.card
    this.componentDidUpdate()

    var set = {
      image: imageObj
    }

    // copy to thumbnail if empty or same
    if ( !card.get('thumb') || card.get('image') && card.get('thumb').name === card.get('image').name )
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
    var classNames = ['card-detail', 'card-type-image']
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
      <div className={classNames.join(' ')} ref="card">
        {tools}
        <ImageComponent onChange={this.imageUploadHandler} className="card-image" image={card.get('image')} />
        <div className="card-content">
          <EditorComponent onChange={this.captionUpdateHandler} focus={true} content={card.get('caption')} placeHolder="Enter a caption" />
          {caption}
        </div>
      </div>
    )
  }
})