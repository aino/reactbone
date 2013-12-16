var Backbone = require('backbone')

var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "detail/:id": "detail"
  }
})

module.exports = new Router()