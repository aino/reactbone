var $ = require('jquery')
var Backbone = require('backbone')
var React = require('react')
var AppComponent = require('./components/app')
var CardCollection = require('./collections/cards')
var Lipsum = require('./lib/aino/lipsum')

Backbone.$ = $

// initialize cards
var cards = new CardCollection()

// make dummy cards

for (var j=0; j<2; j++) {
  cards.push({
    title: Lipsum.words(2,5,true),
    summary: Lipsum.sentences(10, 20)
  })
}

// create the top-level react app
var App = AppComponent({
  cards: cards
});

cards.on('add change remove', function() {
  console.log('EDIT', arguments)
})

React.renderComponent(App, document.body)

// start router
var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "1up": "1up"
  }
})

var dispatch = new Router()

dispatch.on('route', function(url) {
  // set state on App
  App.setState({ url: url })
})

Backbone.history.start()

// backbone test
setTimeout(function() {
  cards.at(0).set('title', '2 SECOND HAS PASSED MUTHERFUCKER!! HELL YEA BRING DA NOIZE')
  setTimeout(function() {
    cards.at(1).set('title', '10 SECONDS HAS PASSED')
  },8000)
},2000)
