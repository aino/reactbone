/** @jsx React.DOM */

var React = require('react')
var UploadComponent = require('./fileupload')
var globals = require('../globals')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      image: this.props.card ? this.props.card.get('image') : null
    }
  },

  getDefaultProps: function() {
    return {
      size: 800,
      maxWidth: 800,
      maxHeight: 600
    }
  },

  componentDidUpdate: function() {
    this.props.onChange && this.props.onChange()
  },

  uploadHandler: function(e, data) {

    var imageObj = {
      features: data.result.features,
      name: data.result.name,
      ratio: Math.round((data.result.features.height/data.result.features.width)*1000)/1000
    }
    
    this.setState({
      image: imageObj
    })

    this.props.card.set({
      image: imageObj
    },{ silent: true })

    this.props.card.hasChanged = true
  },

	render: function() {

    var image = this.state.image
		var imageClasses = ['img']
		var imageElement
    var upload = globals.isEditMode() ? <UploadComponent handler={this.uploadHandler} /> : null
    var width, height, ratio
    var size = this.props.size

		if ( image ) {
      width = image.ratio >= 1 ? size/image.ratio : size
      height = image.ratio >= 1 ? size : size*image.ratio
      ratio = Math.min( 
        this.props.maxWidth/width,
        this.props.maxHeight/height
      )
		  imageElement = <img ref="image" width={width*ratio} height={height*ratio} src={'/public/i/uploads/'+size+'/'+image.name} />
		} else {
		  imageClasses.push('empty')
		}
		return (
      <div className={this.props.className}>
        <div className={imageClasses.join(' ')}>{imageElement}</div>
        {upload}
      </div>
    )
	}
})


    