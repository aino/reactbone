/** @jsx React.DOM */
var React = require('react')
var OpenWindow = require('../lib/aino/openwindow')

module.exports = React.createClass({
  clickHandler: function(e) {
    OpenWindow('http://aino.com', {
      width: 500,
      height: 500,
      onfail: function() {
        console.error('FAIL')
      }
    })
  },
  render: function() {
    var scope = this
    var cards = this.props.cards.map(function(card) {
      return (
        <li key={Math.random()}>
          <h2>{card.get('title')}</h2>
          <p><strong>Hello: </strong>{ card.get('summary') }</p>
          <button onClick={scope.clickHandler}>Click me</button>
        </li>
      )
    })
    return (<ul>{cards}</ul>)
  }
})
