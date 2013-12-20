/** @jsx React.DOM */

var React = require('react')
var Router = require('../router')

module.exports = React.createClass({

  componentDidMount: function(elem) {
    if ( this.props.masonry ) {
      this.props.masonry.refresh(elem.parentNode)
    }
  },

  componentDidUpdate: function() {
    if ( this.props.masonry )
      this.props.masonry.layout()
  },

  openHandler: function() {
    Router.navigate('/detail/' + this.props.card.get('slug'), {trigger: true})
  },

  render: function() {
    
    var image = this.props.card.get('image')
    var imageElement, src

    if (image) {
      src = '/public/i/uploads/320/' + image.name
      imageElement = (
        <div className="image">
          <img src={src} width="192" height={image.ratio*192} />
        </div>
      )
    }
    return(
      <li onClick={this.openHandler}>
        <div>
          {imageElement}
          <div className="summary" dangerouslySetInnerHTML={{__html: this.props.card.get('caption')}}></div>
        </div>
      </li>
    )
  }
})