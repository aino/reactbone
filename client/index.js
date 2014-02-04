var $ = require('jquery')
var Backbone = require('backbone')
var React = require('react')
var AppComponent = require('./components/app')
var CardCollection = require('./collections/cards')
var Router = require('./router')
var globals = require('aino/globals')
var CardTweetModel = require('./models/card.tweet')

var Animate = require('aino/animate')

Backbone.$ = $

// initialize cards
var cards = new CardCollection()
cards.comparator = function(model) { 
  return model.get('date') 
}
cards.fetch()

// sync twitter
/*
$.ajax({
  url: '/twitter?user=davidhellsing',
  success: function(data) {
    var now = Date.now()
    data.data.forEach(function(t) {
      var model = new CardTweetModel({
        id: t.id,
        date: now,
        slug: now,
        summary: t.text
      })
      cards.create(model)
    })
    onTweets()
  }
})
*/
onTweets()

function onTweets() {

  // remove empty cards
  cards.filter(function(card) {
    return card.isEmpty()
  }).forEach(function(model) {
    model.destroy()
  })

  // create the top-level react app
  var App = AppComponent({
    cards: cards
  });

  // register editmode
  globals.register('editmode', false)

  React.renderComponent(App, document.body)

  // start router
  Router.on('route', function(url, params) {

    // set state on App
    App.setState({ 
      url: url, 
      urlParams: params || [] 
    })
  })

  Backbone.history.start()
}

