var Hapi = require('hapi')

var server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080)
})

server.route({
    path: '/upload',
    method: 'POST',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    },

    handler: function(request, reply) {
      var upload = request.payload.file
      var description = request.payload.description
      var filename    = upload.hapi.filename
      var headers     = upload.hapi.headers
      var content     = ''
      
      upload.on('data', function(data) {
          content += data 
      })
      
      upload.on('end', function() {
        reply({
            description: description,
            file: {
                data: content,
                filename: filename,
                headers: headers
            }
        })
      })

    },
})

server.start( function() {})
