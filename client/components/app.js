/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var CardDetailComponent = require('./card_detail')
var CardEditComponent = require('./card_edit')
var UploadComponent = require('./fileupload')
var Router = require('../router')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = React.createClass({

  getInitialState: function() {
    return { url: 'loading', urlParams: [] }
  },

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

  imageHandler: function(e, data) {
    console.log(data.result.name)
  },

  backdropHandler: function() {
    Router.navigate('/', {trigger:true})
  },

  reset: function() {
    var len = this.props.cards.size()
    while(len--) {
      this.props.cards.at(len).destroy()
    }
  },
  
  render: function() {

    // rendering logic based on state goes here
    var main = CardsComponent({
      cards: this.props.cards
    })

    var modalContent
    var modal
    var backdrop

    var card = this.props.cards.findWhere({ 
      slug: this.state.urlParams[0]
    })

    if ( this.state.url == 'detail' && card ) {
      modalContent = <CardDetailComponent card={card} />
    }

    console.log(this.state.url)

    if ( this.state.url == 'create' ) {

      console.log('create', card)
      
      modalContent = CardEditComponent({
        cards: this.props.cards,
        card: card
      })
    }

    if ( modalContent ) {
      modal = (
        <div id="modal">
          <div id="modal-content">
            {modalContent}
          </div>
        </div>
      )
      backdrop = <div id="backdrop" onClick={this.backdropHandler}></div>
    }

    return (
      <div id="site">
        <button onClick={this.reset}>Reset</button>
        <div className={this.state.url}>
          <div className="menu">
            <a href="#">Home</a>
          </div>
          {main}
        </div>
        {modal}
        {backdrop}
      </div>
    )
  }
})
