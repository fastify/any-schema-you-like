'use strict'

const fastify = require('fastify')()

fastify.register(require('..'), {
  schemas: [{
    $id: 'schema1',
    type: 'object',
    properties: {
      hello: { type: 'string' }
    }
  }, {
    $id: 'schema2',
    type: 'object',
    properties: {
      winter: { type: 'string' }
    }
  }]
})

fastify.get('/', (req, reply) => {
  switch (req.query.schema) {
    case '1':
      reply.schema('schema1').send({ hello: 'world' })
      break
    case '2':
      reply.schema('schema2').send({ winter: 'is coming' })
      break
    case 'wrong1':
      reply.schema('schema1').send({ winter: 'is coming' })
      break
    case 'wrong2':
      reply.schema('schema2').send({ hello: 'world' })
      break
    default:
      reply.code(400).send('Wrong query')
  }
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
