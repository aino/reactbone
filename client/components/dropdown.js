/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')

module.exports = React.createClass({

  getInitialState: function() {
    return { open: false }
  },

  componentIsMounted: function() {
    var $dropdown = $(this.refs.dropdown.getDOMNode())
  },

  getDefaultProps: function() {
    return { title: 'Menu' }
  },

  clickHandler: function(e) {
    e.stopPropagation()
    this.setState({
      open: this.state.open ? false : true
    })
  },

  render: function() {

    var style = { display: 'none' }
    if ( this.state.open ) {
      style.display = 'block'
    }

    return (
      <div className="dropdown-wrapper">
        <div className="dropdown-title" onClick={this.clickHandler}>{this.props.title}</div>
        <ul ref="dropdown" style={style}>
          {this.props.children}
        </ul>
      </div>
    )
  }
})