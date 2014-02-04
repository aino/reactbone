/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var EditorComponent = require('./editor')
var globals = require('aino/globals')
var MixinDetail = require('./mixin.detail')
var htmlToBr = require('aino/htmltobr')
var string = require('underscore.string')

module.exports = React.createClass({

  mixins: [ MixinDetail ],

  titleUpdateHandler: function(html, text) {
    this.props.card.set({
      title: text
    }, { silent: true }).save()
  },

  contentUpdateHandler: function(html, text) {
    this.props.card.set({
      content: html
    }, { silent: true }).save()
  },

  preambleUpdateHandler: function(html, text) {

    var card = this.props.card

    var set = {
      preamble: text
    }

    // copy to summary if empty or same
    if ( !card.get('summary') || card.get('summary') === htmlToBr(card.get('preamble')) )
      set.summary = text

    card.set(set, { silent: true }).save()
  },

  render: function() {

    var classNames = ['card-detail', 'card-type-post']
    var card = this.props.card

    return (
      <div className={classNames.join(' ')} ref="card">
        <div className="card-content">
          <EditorComponent className="title" focus={true} onChange={this.titleUpdateHandler} content={card.get('title')} type="text" placeHolder="Enter a title" />
          <EditorComponent className="preamble" onChange={this.preambleUpdateHandler} content={card.get('preamble')} type="text" placeHolder="Enter a preamble" />
          <EditorComponent className="content" onChange={this.contentUpdateHandler} content={card.get('content')} placeHolder="Enter some text" />
        </div>
      </div>
    )
  }
})