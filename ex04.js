var Path  = require('path')
var Hapi  = require('hapi')
var Inert = require('inert')

var server = new Hapi.Server()

server.register(Inert, function() {});

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

server.route({
    path: '/foo/bar/baz/{ignored}', 
    method:'GET', 
    handler: {
        directory: { path: Path.join(__dirname, 'public') }
    }
});

server.start(function () {})
