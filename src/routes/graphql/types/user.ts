import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostListType } from './post.js';
import { IUser } from '../entities/user.js';
import { IContext } from './interface.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: IUser, _, { profileLoader }: IContext) => {
        return await profileLoader.load(id);
      }
    },
    posts: {
      type: PostListType,
      resolve: async ({ id }: IUser, _, { postsLoader }: IContext) => {
        const userPosts = await postsLoader.load(id);
        return userPosts ? [userPosts] : null;
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: async ({ id }: IUser, _, { subscribedToLoader }: IContext) => {
        const subs = await subscribedToLoader.load(id);
        return subs ? [subs] : [];
      }
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: async ({ id }: IUser, _, { subscribersLoader }: IContext) => {
        const subs = await subscribersLoader.load(id);
        return subs ? [subs] : [];
      }
    }
  }),
});

const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserListType = new GraphQLList(new GraphQLNonNull(UserType));

export { UserType, UserListType, CreateUserInputType, ChangeUserInputType };