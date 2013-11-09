define(function(require) {

  var React = require('react');

  return React.createClass({
      render: function() {
        var cards = this.props.cards.map(function(card) {
          return (
            <li key={Math.random()}><h2>{card.get('title')}</h2> <p>{card.get('summary')}</p></li>
          )
        })
        return (<ul>{cards}</ul>)
      }
    })
});