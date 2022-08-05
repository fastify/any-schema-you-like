# @fastify/any-schema

[![NPM version](https://img.shields.io/npm/v/@fastify/any-schema.svg?style=flat)](https://www.npmjs.com/package/@fastify/any-schema)
![CI workflow](https://github.com/fastify/any-schema-you-like/workflows/CI%20workflow/badge.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

Save multiple schemas and decide which one to use to serialize the payload.  
Internally uses [`fast-json-stringify`](https://github.com/fastify/fast-json-stringify) to compile the schemas in extremely fast serialization functions, with all the benefits given by the library, such as preventing the leaking of sensitive data.

## Install
```
npm i @fastify/any-schema
```
## Usage
Register the plugin and pass to it an array of schemas with an id, then use `reply.schema(id)` to decide which schema to use to serialize your data.
```js
const fastify = require('fastify')()

fastify.register(require('@fastify/any-schema'), {
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

fastify.listen({port: 3000}, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

## Acknowledgements

This project is kindly sponsored by:
- [LetzDoIt](https://www.letzdoitapp.com/)

## License

Licensed under [MIT](./LICENSE).
