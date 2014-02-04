/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Editor = require('aino/editor')
var rangy = require('rangy')
var globals = require('aino/globals')
var htmlToBr = require('aino/htmltobr')

module.exports = React.createClass({

	getDefaultProps: function() {
    return {
      placeHolder: 'Write something',
      content: '',
      type: 'rich',
      focus: false
    }
  },

  componentDidMount: function() {
    this.componentDidUpdate()
  },

	componentDidUpdate: function() {

		var self = this
    var isText = this.props.type == 'text'
    var content = this.props.content
    var ref = this.refs.editor || this.refs.holder
    var elem = ref.getDOMNode()

		if ( !globals.get('editmode') ) {
      var instance = $(elem).data('editor')
      if ( instance )
        instance.destroy()
      return elem.innerHTML = content
    }

    var opts = {
      placeholder: this.props.placeHolder
    }

    if ( isText ) {
      opts.disableToolbar = true
      opts.plainText = true
    }

    var editor = Editor( elem, opts )

    editor.setContent(content)
    
    editor.change(function(html) {
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
    if ( globals.get('editmode') ) 
      e.stopPropagation()
  },

  render: function() {

    var classNames = [this.props.className]
    if ( globals.get('editmode') )
      classNames.push('editable')

    classNames = classNames.join(' ')

    var editor = <div key="static" ref="holder" className={classNames} onClick={this.clickHandler} />

    if ( globals.get('editmode') ) {
      editor = <div key="editable" ref="editor" className={classNames} onClick={this.clickHandler} />
    }

    return editor
  }
})
