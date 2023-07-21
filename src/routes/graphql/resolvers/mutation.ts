import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ChangeUserInputType, CreateUserInputType, UserType } from '../types/user.js';
import { ChangePostInputType, CreatePostInputType, PostType } from '../types/post.js';
import { ChangeProfileInputType, CreateProfileInputType, ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { IChangeProfile, ICreateProfile, IProfile } from '../entities/profile.js';
import { IChangePost, ICreatePost, IPost } from '../entities/post.js';
import { IChangeUser, ICreateUser, ISubscribe, IUser } from '../entities/user.js';


export const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
      resolve: async (_, { dto }: ICreateUser, prisma: PrismaClient) => {
        return await prisma.user.create({ data: dto });
      }
    },
    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
      resolve: async (_, { dto }: ICreatePost, prisma: PrismaClient) => {
        return await prisma.post.create({ data: dto });
      }
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
      resolve: async (_, { dto }: ICreateProfile, prisma: PrismaClient) => {
        return await prisma.profile.create({ data: dto });
      }
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: IUser, prisma: PrismaClient) => {
        await prisma.user.delete({ where: { id } });
      }
    },
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: IPost, prisma: PrismaClient) => {
        await prisma.post.delete({ where: { id } });
      }
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: IProfile, prisma: PrismaClient) => {
        await prisma.profile.delete({ where: { id } });
      }
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: { 
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: async (_, { id, dto }: IChangeUser, prisma: PrismaClient) => {
        return await prisma.user.update({ where: { id }, data: dto });
      }
    },
    changePost: {
      type: PostType,
      args: { 
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: async (_, { id, dto }: IChangePost, prisma: PrismaClient) => {
        return await prisma.post.update({ where: { id }, data: dto });
      }
    },
    changeProfile: {
      type: PostType,
      args: { 
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: async (_, { id, dto }: IChangeProfile, prisma: PrismaClient) => {
        return await prisma.profile.update({ where: { id }, data: dto });
      }
    },
    subscribeTo: {
      type: new GraphQLNonNull(UserType),
      args: { 
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { userId, authorId }: ISubscribe, prisma: PrismaClient) => {
        return await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId,
          }
        });
      }
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { 
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { userId, authorId }: ISubscribe, prisma: PrismaClient) => {
        await prisma.subscribersOnAuthors.deleteMany({
          where: {
            subscriberId: userId,
            authorId,
          }
        })
      }
    }
  },
});