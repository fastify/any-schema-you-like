'use strict'

const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const anySchema = require('./index')

test('Basic', t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(anySchema, {
    schemas: [{
      id: 'schema1',
      type: 'object',
      properties: {
        hello: { type: 'string' }
      }
    }, {
      id: 'schema2',
      type: 'object',
      properties: {
        winter: { type: 'string' }
      }
    }]
  })

  fastify.get('/:schema', (req, reply) => {
    reply
      .schema(req.params.schema)
      .send({ hello: 'world' })
  })

  fastify.inject({
    url: '/schema1',
    method: 'GET'
  }, res => {
    const payload = JSON.parse(res.payload)
    t.deepEqual(payload, { hello: 'world' })

    fastify.inject({
      url: '/schema2',
      method: 'GET'
    }, res => {
      const payload = JSON.parse(res.payload)
      t.deepEqual(payload, {})
      fastify.close()
    })
  })
})

test('Schema with same id', t => {
  t.plan(1)

  const fastify = Fastify()
  fastify
    .register(anySchema, {
      schemas: [{
        id: 'schema1',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }, {
        id: 'schema1',
        type: 'object',
        properties: {
          winter: { type: 'string' }
        }
      }]
    })
    .after(err => {
      t.is(err.message, 'Schema with id \'schema1\' is already defined')
    })

  fastify.close()
})
