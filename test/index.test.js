'use strict'

const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const anySchema = require('..')

test('Basic', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(anySchema, {
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

  fastify.get('/:schema', (req, reply) => {
    reply
      .schema(req.params.schema)
      .send({ hello: 'world' })
  })

  const response = await fastify.inject({
    url: '/schema1',
    method: 'GET'
  })

  const payload = JSON.parse(response.payload)
  t.same(payload, { hello: 'world' })

  const response2 = await fastify.inject({
    url: '/schema2',
    method: 'GET'
  })
  const payload2 = JSON.parse(response2.payload)
  t.same(payload2, {})
  fastify.close()
})

test('Schema with same id', t => {
  t.plan(1)

  const fastify = Fastify()
  fastify
    .register(anySchema, {
      schemas: [{
        $id: 'schema1',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }, {
        $id: 'schema1',
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

test('Client supplies `toString`, `__proto__` and `constructor` when no there is no schema with these ids', async t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(anySchema, {
    schemas: []
  })

  const expectedPayload = { hello: 'world' }

  fastify.get('/:schema', (req, reply) => {
    reply
      .schema(req.params.schema)
      .send(expectedPayload)
  })

  const response = await fastify.inject({
    url: '/toString',
    method: 'GET'
  })

  const payload1 = JSON.parse(response.payload)
  t.same(payload1, expectedPayload)

  const response2 = await fastify.inject({
    url: '/__proto__',
    method: 'GET'
  })

  const payload2 = JSON.parse(response2.payload)
  t.same(payload2, expectedPayload)

  const response3 = await fastify.inject({
    url: '/constructor',
    method: 'GET'
  })
  const payload3 = JSON.parse(response3.payload)
  t.same(payload3, expectedPayload)

  fastify.close()
})
