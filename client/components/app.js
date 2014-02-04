/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')

var DetailImageComponent = require('./detail.image')
var CardImageModel = require('../models/card.image')
var DetailPostComponent = require('./detail.post')
var CardPostModel = require('../models/card.post')
var DetailTweetComponent = require('./detail.tweet')
var CardTweetModel = require('../models/card.tweet')

var ModalComponent = require('./modal')
var Router = require('../router')
var Backbone = require('backbone')
var _ = require('underscore')
var globals = require('aino/globals')

var factoryTypes = {
  'image': [CardImageModel, DetailImageComponent],
  'post':  [CardPostModel, DetailPostComponent],
  'tweet': [CardTweetModel, DetailTweetComponent]
}
var factory = function(type) {
  if ( factoryTypes.hasOwnProperty(type) )
    return {
      model: factoryTypes[type][0],
      component: factoryTypes[type][1]
    }
}

module.exports = React.createClass({

  getInitialState: function() {
    return {
      url: 'loading', 
      urlParams: []
    }
  },

  componentDidMount: function() {
    this.props.cards.on('add change remove', function() {
      this.setProps({ cards: this.props.cards })
    }, this)
    globals.on('editmode', function() {
      this.forceUpdate()
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

  closeHandler: function() {
    Router.navigate('/', { trigger: true })
  },

  createAction: function(e) {
    var factoryObj = factory(e.target.getAttribute('data-type'))
    var now = Date.now().toString()
    var model = new factoryObj.model({
      slug: now,
      date: now
    })
    this.props.cards.create(model)
    Router.navigate('/detail/'+now, {trigger:true})
  },

  editModeToggle: function() {
    globals.set('editmode', !globals.get('editmode'))
  },
  
  render: function() {

    // rendering logic based on state goes here

    var detail

    var card = this.props.cards.findWhere({ 
      slug: this.state.urlParams[0]
    })

    console.log('card', card, this.state.urlParams, this.props.cards)

    if( this.state.url == 'detail' && card ) {
      var factoryObj = factory(card.get('type'))
      detail = (
        <ModalComponent closeHandler={this.closeHandler}>
          { factoryObj.component({card:card}) }
        </ModalComponent>
      )
    }

    var controls = <button onClick={this.editModeToggle}>Edit mode</button>

    if ( globals.get('editmode') ) {
      controls = (
        <div className="tools">
          <button onClick={this.resetAction}>Clear</button>
          <button onClick={this.createAction} data-type="image">Create Image card</button>
          <button onClick={this.createAction} data-type="post">Create Post card</button>
          <button onClick={this.editModeToggle}>View mode</button>
        </div>
      )
    }

    return (
      <div id="site">
        <div className="controls">{controls}</div>
        <div className={this.state.url}>
          <CardsComponent cards={this.props.cards} />
        </div>
        {detail}
      </div>
    )
  }
})
