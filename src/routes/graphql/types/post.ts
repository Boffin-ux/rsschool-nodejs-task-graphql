import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  }),
});

const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    authorId: {type: UUIDType},
  }),
});

const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }),
});

const PostListType = new GraphQLList(new GraphQLNonNull(PostType));

export { PostType, PostListType, CreatePostInputType, ChangePostInputType };