/** @jsx React.DOM */

var React = require('react')
var CardsComponent = require('./cards')
var Forms = require('../lib/aino/form')
var $ = require('jquery')

module.exports = React.createClass({

  getInitialState: function() {
    return { url: 'loading' }
  },

  componentDidMount: function() {
    var form = this.refs.uploadform.getDOMNode()
    var status;

    $(form).ajaxForm({
      beforeSend: function() {
        status = 0
      },
      uploadProgress: function(event, position, total, percentComplete) {
        console.log(percentComplete)
      },
      success: function() {
        console.log('READY')
      },
      complete: function(xhr) {
        console.log(xhr)
      }
    }); 
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
        <form method="post" ref="uploadform" encType="multipart/form-data" action="/upload">
            <input type="file" name="file"/>
            <input type="submit" value="Submit"/>
        </form>
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
