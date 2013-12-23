
var globals = {}
var has = function(prop) {
  return globals.hasOwnProperty(prop)
}

module.exports = {

  register: function(prop, value) {
    if ( !has(prop) )
      globals[prop] = value
  },

  set: function(prop, value) {
    if ( has(prop) )
      globals[prop] = value
  },

  get: function(prop) {
    if ( has(prop) )
      return globals[prop]
  }
}