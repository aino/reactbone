/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    var card = this.props.card
    return(
      <div className="card-detail">
        <div dangerouslySetInnerHTML={{__html: card.get('content')}}></div>
      </div>
    )
  }
})
