define(function(require) {

  var React = require('react')
  var CardsComponent = require('jsx!components/cards')

  return React.createClass({
    getInitialState: function() {
      return { url: 'loading' }
    },
    route: function( url ) {
      this.setState({ url: url })
    },
    mixins: [{
      componentDidMount: function() {
        this.getBackboneModels().forEach(function(model) {
          model.on('add change remove', this.forceUpdate.bind(this, null), this)
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
    render: function() {

      // rendering logic based on state goes here
      var main = <CardsComponent cards={this.props.cards}/>

      if ( this.state.url == '1up' ) {
        main = (<h1>Extraliv!!</h1>)
      }

      return (
        <div className={this.state.url}>
          <div className="menu">
            <a href="#">Home</a><a href="#1up">1up</a>
          </div>
          {main}
        </div>
      )
    }
  });
});