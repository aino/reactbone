/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')

require('../lib/fileupload/jquery.fileupload')

module.exports = React.createClass({

  getInitialState: function() {
    return { formkey: 0 }
  },

  componentDidMount: function() {
    var form = this.refs.upload.getDOMNode()
    $(form).fileupload({
      dataType: 'json',
      replaceFileInput: false,
      done: this.props.handler || function(){}
    })
  },

  componentDidUpdate: function() {
    this.componentDidMount()
  },

  changeHandler: function() {
    this.setState({
      formkey: this.state.formkey+1
    })
  },

  render: function() {
    return <input key={this.state.formkey} type="file" name="file" data-url="/upload" ref="upload" value="" onChange={this.changeHandler} />
  }
})