var Hapi = require('hapi')
var server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080)
})

server.register(require('hapi-auth-basic'), function(err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate })
})

function validate(request, username, password, callback) {
    var isValid = (username === "hapi") && (password === "auth")
    return callback(null, isValid, {})
}

server.route({
    method: 'GET',
    path: '/', 
    config: {
        auth: 'simple',
        handler: function(request, reply) {
            reply("Success")
        }
    }
})

server.start( function() {} )