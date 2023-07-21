import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { Schema } from './resolvers/root.js';

const schema = new Schema();

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = String(req.body.query);
      const variableValues = req.body.variables;
      const contextValue = prisma;
      return await graphql({ schema, source, contextValue, variableValues });
    },
  });
};

export default plugin;
