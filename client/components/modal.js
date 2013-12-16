/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div id="modal-wrapper">
        <div id="modal">
          <div id="modal-content">
            {this.props.children}
          </div>
        </div>
        <div id="backdrop" onClick={this.props.closeHandler}></div>
      </div>
    )
  }
})