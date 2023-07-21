import { GraphQLSchema } from 'graphql';
import { RootQuery } from './query.js';
import { RootMutation } from './mutation.js';

export class Schema extends GraphQLSchema {
  constructor() {
    super({
      query: RootQuery,
      mutation: RootMutation,
    });
  }
};