import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { Schema } from './resolvers/root.js';
import depthLimit from 'graphql-depth-limit';
import { builderDataLoaders } from './loaders/builder.js';

const DEPTH_LIMIT = 5;
const schema = new Schema();

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  const dataLoaders = builderDataLoaders(prisma);

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
      const contextValue = { prisma, ...dataLoaders };
      const validationErrors = validate(schema, parse(source), [depthLimit(DEPTH_LIMIT)]);

      if(validationErrors.length !== 0) {
        return {data: null, errors: validationErrors};
      }

      return await graphql({ schema, source, contextValue, variableValues });
    },
  });
};

export default plugin;
