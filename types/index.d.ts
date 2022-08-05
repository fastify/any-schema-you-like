import { Schema } from "fast-json-stringify";
import { FastifyPluginCallback } from "fastify"

declare module "fastify" {

  interface FastifyReply {
    schema(schema: string): this;
  }
}

export interface FastifyAnySchemaYouLikeOptions {
  schemas: Schema[];
}

declare const fastifyAnySchemaYouLike: FastifyPluginCallback<FastifyAnySchemaYouLikeOptions>

export default fastifyAnySchemaYouLike
