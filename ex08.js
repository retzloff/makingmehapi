var Hapi  = require('hapi')
var Path  = require('path')
var fs    = require('fs')
var rot13 = require('rot13-transform')

var server = new Hapi.Server()
server.connection( {
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

server.route( {
    path:    '/',
    method:  'GET',
    handler: function(request, reply){
        return reply(
            fs.createReadStream(Path.join(__dirname, 'clear.txt')).pipe(rot13())
        )
    }
})

server.start( function(){} )