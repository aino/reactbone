var $ = require('jquery')
  , Backbone = require('backbone')
  , React = require('react')
  , AppComponent = require('./components/app')
  , CardCollection = require('./collections/cards')
  , Lipsum = require('./lib/aino/lipsum')

Backbone.$ = $

// we need a way to include libs from bower easier, this will fail:
//var str = require('underscore.string');

// initialize cards
var cards = new CardCollection()

console.log(cards)

// make dummy cards
for (var j=0; j<20; j++) {
  cards.push({
    title: Lipsum.words(2,5,true),
    summary: Lipsum.sentence(10,20)
  })
}

// create the top-level react app
var App = AppComponent({
  cards: cards
});

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
  App.route(url)
})

Backbone.history.start()

// backbone test
setTimeout(function() {
  cards.at(0).set('title', '1 SECOND HAS PASSED')
  setTimeout(function() {
    cards.at(1).set('title', '2 SECONDS HAS PASSED')
  },1000)
},1000)
