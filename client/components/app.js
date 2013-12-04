/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var CardDetailComponent = require('./card_detail')
var UploadComponent = require('./fileupload')

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
  
  render: function() {

    // rendering logic based on state goes here
    var main = CardsComponent({
      cards: this.props.cards
    })

    if ( this.state.url == 'detail' ) {
      var card = this.props.cards.findWhere({ 
        slug: parseInt(this.state.urlParams[0], 10)
      })
      if ( card )
        main = (<CardDetailComponent card={card} />)
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
      </div>
    )
  }
})
