/** @jsx React.DOM */

var React = require('react')
var Router = require('../router')

module.exports = React.createClass({

  componentDidMount: function() {
    if ( this.props.masonry )
      this.props.masonry.layout()
  },

  componentDidUpdate: function() {
    if ( this.props.masonry )
      this.props.masonry.layout()
  },

  clickHandler: function() {
    Router.navigate('/detail/' + this.props.card.get('slug'), {trigger: true})
  },

  render: function() {
    var card = this.props.card
    return(
      <li onClick={this.clickHandler}>
        <p dangerouslySetInnerHTML={{__html: card.get('summary')}}></p>
      </li>
    )
  }
})