import fastify from "fastify"
import anySchema from ".."

const app = fastify()

app.register(anySchema, {
  schemas: [{
    $id: 'test',
    type: 'object',
    properties: {
      hello: { type: 'string' }
    }
  }]
})

app.get('/:schema', (req, reply) => {
  reply
    .schema('test')
    .send({ hello: 'world' })
})
