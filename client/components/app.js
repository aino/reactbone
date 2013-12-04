/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var $ = require('jquery')

require('../lib/fileupload/jquery.fileupload')

module.exports = React.createClass({

  getInitialState: function() {
    return { url: 'loading', formkey: 0 }
  },

  onChange: function() {
    this.setState({
      formkey: this.state.formkey+1
    })
  },

  componentDidUpdate: function() {
    var form = this.refs.upload.getDOMNode()
    $(form).fileupload({
      dataType: 'json',
      replaceFileInput: false,
    })
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
  
  render: function() {

    // rendering logic based on state goes here
    var main = CardsComponent({
      cards: this.props.cards
    })

    if ( this.state.url == '1up' ) {
      main = (<h1>Extraliv!!</h1>)
    }

    return (
      <div id="site">
        <input key={this.state.formkey} id="fileupload" type="file" name="file" data-url="/upload" ref="upload" onChange={this.onChange} />
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
