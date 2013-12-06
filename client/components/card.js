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

  editHandler: function(e) {
    e.stopPropagation()
    Router.navigate('/create/'+this.props.card.get('slug'), {trigger:true})
  },

  render: function() {
    
    var card
    var handler

    if ( this.props.card ) {
      card = (
        <div>
          <div dangerouslySetInnerHTML={{__html: this.props.card.get('content')}}></div>
          <button onClick={this.editHandler}>Edit</button>
        </div>
      )
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