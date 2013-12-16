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
    
    var src = this.props.card.get('image')
    var img

    if (src) {
      src = '/public/i/uploads/320/' + src
      img = (
        <div className="image">
          <img src={src} width="192" height={this.props.card.get('imageratio')*192} />
        </div>
      )
    }
    return(
      <li onClick={this.openHandler}>
        <div>
          {img}
          <div className="summary" dangerouslySetInnerHTML={{__html: this.props.card.get('caption')}}></div>
        </div>
      </li>
    )
  }
})