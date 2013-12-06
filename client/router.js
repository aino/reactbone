var Backbone = require('backbone')

var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "detail/:id": "detail",
    "create": "create"
  }
})

module.exports = new Router()