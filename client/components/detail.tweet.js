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

  render: function() {

    var classNames = ['card-detail', 'card-type-tweet']
    var card = this.props.card

    return (
      <div className={classNames.join(' ')} ref="card">
        <div className="card-content">
          <div className="tweet">{card.get('summary')}</div>
        </div>
      </div>
    )
  }
})