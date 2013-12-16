/** @jsx React.DOM */

var React = require('react')
var UploadComponent = require('./fileupload')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      image: this.props.card ? this.props.card.get('image') : ''
    }
  },

  uploadHandler: function(e, data) {
    
    this.setState({
      image: data.result.name
    })

    this.props.card.set({
      image: data.result.name,
      imageratio: Math.round((data.result.features.height/data.result.features.width)*1000)/1000
    },{ silent: true })

    this.props.card.hasChanged = true
  },

	render: function() {
		var imageClasses = ['img']
		var img
    var upload = this.props.upload ? <UploadComponent handler={this.uploadHandler} /> : null

		if ( this.state.image ) {
		  img = <img src={'/public/i/uploads/800/'+this.state.image} />
		} else {
		  imageClasses.push('empty')
		}
		return (
      <div className={this.props.className}>
        <div className={imageClasses.join(' ')}>{img}</div>
        {upload}
      </div>
    )
	}
})


    