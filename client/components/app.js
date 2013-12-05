/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var CardDetailComponent = require('./card_detail')
var UploadComponent = require('./fileupload')
var Router = require('../router')

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
  
  render: function() {

    // rendering logic based on state goes here
    var main = CardsComponent({
      cards: this.props.cards
    })

    var modalContent
    var modal
    var backdrop

    if ( this.state.url == 'detail' ) {
      var card = this.props.cards.findWhere({ 
        slug: parseInt(this.state.urlParams[0], 10)
      })
      if ( card )
        modalContent = (<CardDetailComponent card={card} />)
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
        <UploadComponent handler={this.imageHandler} />
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
