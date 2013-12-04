/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var UploadComponent = require('./fileupload')

module.exports = React.createClass({

  getInitialState: function() {
    return { url: 'loading' }
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

    if ( this.state.url == '1up' ) {
      main = (<h1>Extraliv!!</h1>)
    }

    if( this.state.url == 'detail' ) {
      var card = this.props.cards.where({ id: })
      main = (<CardDetailComponent )
    }

    return (
      <div id="site">
        <UploadComponent handler={this.imageHandler} />
        <div className={this.state.url}>
          <div className="menu">
            <a href="#">Home</a><a href="#1up">1up</a>
          </div>
          {main}
        </div>
      </div>
    )
  }
})
