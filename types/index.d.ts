import { Schema } from "fast-json-stringify";
import { FastifyPluginCallback } from "fastify"

declare module "fastify" {
  interface FastifyReply {
    schema(schema: string): this;
  }
}

type FastifyAnySchema = FastifyPluginCallback<fastifyAnySchema.FastifyAnySchemaYouLikeOptions>

declare namespace fastifyAnySchema {
  export interface FastifyAnySchemaYouLikeOptions {
    schemas: Schema[];
  }

  export const fastifyAnySchema: FastifyAnySchema
  export { fastifyAnySchema as default }
}

declare function fastifyAnySchema(...params: Parameters<FastifyAnySchema>): ReturnType<FastifyAnySchema>
export = fastifyAnySchema
