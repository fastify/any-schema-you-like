# any-schema-you-like

[![Greenkeeper badge](https://badges.greenkeeper.io/fastify/any-schema-you-like.svg)](https://greenkeeper.io/)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://travis-ci.org/fastify/any-schema-you-like.svg?branch=master)](https://travis-ci.org/fastify/any-schema-you-like)

Save multiple schemas and decide which one use to serialize the payload.  
Internally uses [`fast-json-stringify`](https://github.com/fastify/fast-json-stringify) to compile the schemas in extremely fast serialization functions, with all the benefits given by the library, such as preventing the leaking of sensitive data.

## Install
```
npm i any-schema-you-like --save
```
## Usage
Register the plugin and pass to it an array of schemas with an id, the use `reply.schema(id)` to decide which schema use to serialize your data.
```js
const fastify = require('fastify')()

fastify.register(require('any-schema-you-like'), {
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

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

## Acknowledgements

This project is kindly sponsored by:
- [LetzDoIt](http://www.letzdoitapp.com/)

## License

Licensed under [MIT](./LICENSE).
