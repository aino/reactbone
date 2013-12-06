/** @jsx React.DOM */

var React = require('react')
var Router = require('../router')

module.exports = React.createClass({

  componentDidMount: function(elem) {
    if ( this.props.masonry ) {
      this.props.masonry.refresh(elem.parentNode)
    }
  },

  componentDidUpdate: function() {
    if ( this.props.masonry )
      this.props.masonry.layout()
  },

  openHandler: function() {
    Router.navigate('/detail/' + this.props.card.get('slug'), {trigger: true})
  },

  actionHandler: function() {
    Router.navigate(this.props.action, {trigger: true})
  },

  render: function() {
    
    var card
    var handler

    if ( this.props.card ) {
      card = <p dangerouslySetInnerHTML={{__html: this.props.card.get('content')}}></p>
      handler = this.openHandler
    } else if ( this.props.action ) {
      card = <p>{this.props.label}</p>
      handler = this.actionHandler
    }
    return(
      <li onClick={handler}>
        {card}
      </li>
    )
  }
})