var express = require('express')
  , config = require('../conf/config')
  , http = require('http')
  , r = require('./routes')
  , m = require('./middleware')
  , hoganExpress = require('hogan-express')
  , path = require('path')

var app = express()

app.set( 'view engine', 'html' )
app.set( 'views', __dirname + '/views' )
app.engine( 'html', hoganExpress )

//
// Middleware
app.use( express.bodyParser() )
app.use( express.compress() )
app.use( '/public', express.static(path.join(__dirname, '..', 'public')) )
app.use( m.bundles )
app.use( express.errorHandler() )

//
// Routes
app.get( '/', r.index)


var server = http.createServer( app )
server.listen( config.port, function() {
  console.log( "Express server listening on port " + config.port )
})

