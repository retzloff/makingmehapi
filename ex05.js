var Path = require('path')
var Hapi = require('hapi')
var Vision = require('vision')

var server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

server.register(Vision, function() {});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
})

server.route({
    path: '/', 
    method:'GET', 
    handler: {
        view: 'index.html'
    }
})

server.start(function () {})
