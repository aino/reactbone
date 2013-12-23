/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Medium = require('../lib/aino/medium')
var rangy = require('rangy')
var globals = require('../globals')
var htmlToBr = require('../lib/aino/htmltobr')

module.exports = React.createClass({

	getDefaultProps: function() {
    return {
      placeHolder: 'Write something',
      content: '',
      type: 'rich',
      focus: true
    }
  },

  componentDidMount: function() {
    this.componentDidUpdate()
  },

	componentDidUpdate: function() {

		var self = this
		var elem = this.refs.editor.getDOMNode()
    var isText = this.props.type == 'text'
    var content = this.props.content

		if ( !globals.get('editmode') ) {
		  elem.innerHTML = content
      return
		}

    var opts = {
      placeholder: this.props.placeHolder
    }

    if ( isText ) {
      opts.disableToolbar = true
      opts.plainText = true
    }

    var medium = Medium( elem, opts )

    medium.setContent(content)
    
    medium.change(function(html) {
      if ( typeof self.props.onChange == 'function' ) {
        var clean = self.cleanUp(html)
        self.props.onChange(clean, htmlToBr(clean))
      }
    })

    if ( !this.props.focus )
      return

    $(elem).focus()

		rangy.addInitListener(function() {
		  var range = rangy.createRange()
		  range.selectNodeContents(elem)
		  range.collapse(false)
		  var sel = rangy.getSelection()
		  sel.removeAllRanges()
		  sel.addRange(range)
		})
	},

  cleanUp: function(html) {

    html = $.trim(html)
    if( !$('<div>').html(html).text() )
      return ''

    // remove empty last paragraphs
    return $.trim( html.replace(/(<p>\s*<br>\s*<\/p>)+$/, '') )

  },

  clickHandler: function(e) {
    e.stopPropagation()
  },

  render: function() {

    console.log('clean')
    var editor = <div key="static" ref="editor" className="content" onClick={this.clickHandler} />

    if ( globals.get('editmode') ) {
      editor = <div key="editable" ref="editor" className="editable content" onClick={this.clickHandler} />
    }

    return editor
  }
})
