var Backbone = require('backbone')

var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "detail/:id": "detail",
    "1up": "1up"
  }
})

module.exports = new Router()