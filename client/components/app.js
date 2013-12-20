/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var CardDetailComponent = require('./card_detail')
var UploadComponent = require('./fileupload')
var Router = require('../router')
var Backbone = require('backbone')
var _ = require('underscore')
var globals = require('../globals')

module.exports = React.createClass({

  getInitialState: function() {
    return { 
      url: 'loading', 
      urlParams: [],
      editMode: globals.editMode
    }
  },

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

  editModeToggle: function() {
    this.setState({
      editMode: !this.state.editMode
    })
    globals.toggleEditMode()
  },
  
  render: function() {

    // rendering logic based on state goes here
    var main = <CardsComponent cards={this.props.cards} />

    var card = this.props.cards.findWhere({ 
      slug: this.state.urlParams[0]
    })

    var detail = this.state.url == 'detail' && card ? <CardDetailComponent card={card} /> : null

    var controls = <button onClick={this.editModeToggle}>Edit mode</button>

    if ( this.state.editMode ) {
      controls = (
        <div className="tools">
          <button onClick={this.resetAction}>Clear</button>
          <button onClick={this.createAction}>Create</button>
          <button onClick={this.editModeToggle}>View mode</button>
        </div>
      )
    }

    return (
      <div id="site">
        <div className="controls">{controls}</div>
        <div className={this.state.url}>{main}</div>
        {detail}
      </div>
    )
  }
})
