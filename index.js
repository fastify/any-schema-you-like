'use strict'

const fp = require('fastify-plugin')
const FJS = require('fast-json-stringify')

function plugin (fastify, opts, next) {
  const store = createStore(opts.schemas)
  if (store instanceof Error) return next(store)
  fastify.decorateReply('schema', schema)
  next()

  function schema (id) {
    const stringify = store[id]
    if (stringify === undefined) {
      return this
    }
    return this.serializer(stringify)
  }
}

function createStore (schemas) {
  const store = Object.create(null)
  for (let i = 0; i < schemas.length; i++) {
    const id = schemas[i].id
    if (store[id] !== undefined) {
      return new Error(`Schema with id '${id}' is already defined`)
    }
    store[id] = FJS(schemas[i])
  }
  return store
}

module.exports = fp(plugin)
