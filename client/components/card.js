/** @jsx React.DOM */

var React = require('react')
var Router = require('../router')
var ImageComponent = require('./image')
var EditorComponent = require('./editor')
var htmlToBr = require('../lib/aino/htmltobr')

module.exports = React.createClass({

  componentDidMount: function(elem) {
    if ( this.props.masonry ) {
      this.props.masonry.refresh(elem.parentNode)
    }
  },

  componentDidUpdate: function() {
    if ( this.props.masonry )
      this.props.masonry.layout()
  },

  openHandler: function() {
    Router.navigate('/detail/' + this.props.card.get('slug'), {trigger: true})
  },

  imageUploadHandler: function(imageObj) {
    this.props.card.set({
      thumb: imageObj
    }).save()
  },

  summaryUpdateHandler: function(html) {
    this.props.card.set({
      summary: htmlToBr(html)
    }, {silent: true}).save()
  },

  render: function() {
    var card = this.props.card
    return(
      <li onClick={this.openHandler}>
        <div>
          <ImageComponent size="320" maxWidth="192" maxHeight="1000" image={card.get('thumb')} onChange={this.imageUploadHandler} />
          <div className="summary">
            <EditorComponent focus={false} type="text" onChange={this.summaryUpdateHandler} content={card.get('summary')} placeHolder="Summary" />
          </div>
        </div>
      </li>
    )
  }
})