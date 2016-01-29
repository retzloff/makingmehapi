var Hapi = require('hapi')
var Boom = require('boom')
var server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080)
})

server.state('session', {
    encoding: 'base64json',
    ttl: 10,
    domain: 'localhost', 
    path: '/'
})

server.route({
    path: '/set-cookie',
    method: 'GET',
    handler: function(request, reply) {
        reply('Success').state('session', { key: 'makemehapi'})
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
})

server.route({
    path: '/check-cookie',
    method: 'GET',
    handler: function(request, reply) {
        
        var session = request.state.session
        
        if (session) {
            reply({user: 'hapi'})
        } else {
            reply(Boom.unauthorized('Missing authentication'))
        }
    }
})

server.start(function(){})