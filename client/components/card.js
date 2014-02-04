/** @jsx React.DOM */

var React = require('react')
var Router = require('../router')
var ImageComponent = require('./image')
var EditorComponent = require('./editor')
var DropdownComponent = require('./dropdown')
var htmlToBr = require('aino/htmltobr')
var $ = require('jquery')

var height;

module.exports = React.createClass({

  getHeight: function() {
    return $(this.refs.description.getDOMNode()).outerHeight()
  },

  adjustHeight: function() {
    var newHeight = this.getHeight()
    if( height && newHeight != height ) {
      this.props.masonry.layout()
      height = newHeight
    }
  },

  componentDidMount: function(elem) {
    if ( this.props.masonry ) {
      this.props.masonry.refresh(elem.parentNode)
    }
    height = this.getHeight()
  },

  componentDidUpdate: function() {
    if ( this.props.masonry )
      this.props.masonry.layout()
    height = this.getHeight()
  },

  openHandler: function() {
    Router.navigate('/detail/' + this.props.card.get('slug'), {trigger: true})
  },

  imageUploadHandler: function(imageObj) {
    this.props.card.set({
      thumb: imageObj
    }).save()
    this.componentDidUpdate()
  },

  summaryUpdateHandler: function(html) {
    this.props.card.set({
      summary: htmlToBr(html)
    }, {silent: true}).save()
    this.adjustHeight()
  },

  summaryTitleHandler: function(html) {
    this.props.card.set({
      summary: htmlToBr(html)
    }, {silent: true}).save()
    this.adjustHeight()
  },

  render: function() {
    var title, type
    var card = this.props.card
    if ( card.get('type') == 'post' && card.get('title'))
      title = <h3>{card.get('title')}</h3>
    if ( card.get('typetitle') )
      type = <h2>{card.get('typetitle')}</h2>
    return(
      <li onClick={this.openHandler} ref="li" className={'type-'+card.get('type')}>
        {type}
        <div>
          <ImageComponent size="320" maxWidth="240" maxHeight="1000" image={card.get('thumb')} onChange={this.imageUploadHandler} />
          {title}
          <div className="description" ref="description">
            <EditorComponent className="summary" focus={false} type="text" onChange={this.summaryUpdateHandler} content={card.get('summary')} placeHolder="Summary" />
          </div>
        </div>
      </li>
    )
  }
})