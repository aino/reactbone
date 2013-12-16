/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var CardDetailComponent = require('./card_detail')
var UploadComponent = require('./fileupload')
var Router = require('../router')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = React.createClass({

  getInitialState: function() {
    return { url: 'loading', urlParams: [] }
  },

  /*

  mixins: [{
    componentDidMount: function() {
      this.getBackboneModels().forEach(function(model) {
        model.on('add change remove', function() {
          this.forceUpdate()
        }, this)
      }, this)
    },
    componentWillUnmount: function() {
      this.getBackboneModels().forEach(function(model) {
        model.off(null, null, this)
      }, this)
    }
  }],

  getBackboneModels: function() {
    return [this.props.cards];
  },

  */

  componentDidMount: function() {
    this.props.cards.on('add change remove', function() {
      this.setProps({ cards: this.props.cards })
    }, this)
  },

  componentWillUnmount: function() {
    this.props.cards.off(null, null, this)
  },

  resetAction: function() {
    var len = this.props.cards.size()
    while(len--) {
      this.props.cards.at(len).destroy()
    }
  },

  createAction: function() {
    var slug = Date.now().toString()
    this.props.cards.create({
      slug: slug
    })
    Router.navigate('/detail/'+slug, {trigger:true})
  },
  
  render: function() {

    // rendering logic based on state goes here
    var main = CardsComponent({
      cards: this.props.cards
    })

    var card = this.props.cards.findWhere({ 
      slug: this.state.urlParams[0]
    })

    var detail = this.state.url == 'detail' && card ? <CardDetailComponent card={card} /> : null

    return (
      <div id="site">
        <div className="controls">
          <button onClick={this.resetAction}>Reset</button>
          <button onClick={this.createAction}>Create</button>
        </div>
        <div className={this.state.url}>
          {main}
        </div>
        {detail}
      </div>
    )
  }
})
