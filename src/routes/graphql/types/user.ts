import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostListType } from './post.js';
import { PrismaClient } from '@prisma/client';
import { IUser } from '../entities/user.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: IUser, _args, prisma: PrismaClient) => {
        return await prisma.profile.findUnique({ where: { userId: id } });
      }
    },
    posts: {
      type: PostListType,
      resolve: async ({ id }: IUser, _args, prisma: PrismaClient) => {
        return await prisma.post.findMany({ where: { authorId: id } });
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: async ({ id }: IUser, _args, prisma: PrismaClient) => {
        return await prisma.user.findMany({ 
          where: { 
            subscribedToUser: { 
              some: {
                subscriberId: id,
              },
            } 
          },
        });
      }
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: async ({ id }: IUser, _args, prisma: PrismaClient) => {
        return await prisma.user.findMany({ 
          where: { 
            userSubscribedTo: { 
              some: {
                authorId: id,
              },
            } 
          },
        });
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