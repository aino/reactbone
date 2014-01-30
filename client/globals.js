
var globals = {}
var handlers = []
var has = function(prop) {
  return globals.hasOwnProperty(prop)
}
var trigger = function(prop, value) {
  handlers.forEach(function(handleObj) {
    if (handleObj.prop === prop)
      handleObj.handler.call(handleObj.context, value)
  })
}

module.exports = {

  register: function(prop, value) {
    if ( !has(prop) )
      globals[prop] = value
  },

  set: function(prop, value) {
    if ( has(prop) ) {
      globals[prop] = value
      trigger(prop, value)
    }
  },

  get: function(prop) {
    if ( has(prop) )
      return globals[prop]
  },

  on: function(prop, handler, context) {
    handlers.push({
      prop: prop,
      handler: handler,
      context: context || this
    })
  },

  off: function(prop, handler) {
    if ( !prop )
      return handlers = []
    handlers.slice(0).forEach(function(handleObj, i) {
      if ( prop === handleObj.prop && ( !handler || handler === handleObj.handler ) )
        handlers.splice(i, 1)
    })
  }
}