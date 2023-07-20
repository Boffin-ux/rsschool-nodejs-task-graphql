import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserListType, UserType } from '../types/user.js';
import { MemberListType, MemberType, MemberTypeEnum } from '../types/member.js';
import { PostListType, PostType } from '../types/post.js';
import { ProfileListType, ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { IProfile } from '../entities/profile.js';
import { IPost } from '../entities/post.js';
import { IUser } from '../entities/user.js';
import { IMemberType } from '../entities/member.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
    type: MemberListType,
    resolve: async (_parent, _args, prisma: PrismaClient) => {
        return await prisma.memberType.findMany();
      }
    },

    memberType: {
    type: MemberType,
    args: { id: { type: MemberTypeEnum } },
    resolve: async (_parent, { id }: IMemberType, prisma: PrismaClient) => {
        const memberType = await prisma.memberType.findUnique({ where: { id } });

        return memberType ? memberType : null;
      }
    },

    users: {
      type: UserListType,
      resolve: async (_parent, _args, prisma) => {
        return await prisma.user.findMany();
      }
    },

    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }: IUser, prisma: PrismaClient) => {
        const user = await prisma.user.findUnique({ where: { id } });

        return user ? user : null;
      }
    },

    posts: {
      type: PostListType,
      resolve: async (_parent, _args, prisma) => {
        return await prisma.post.findMany();
      }
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }: IPost, prisma: PrismaClient) => {
        const post = await prisma.post.findUnique({ where: { id } });
        
        return post ? post : null;
      }
    },
    
    profiles: {
      type: ProfileListType,
      resolve: async (_parent, _args, prisma: PrismaClient) => {
        return await prisma.profile.findMany();
      }
    },
    
    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: IProfile, prisma) => {
        const profile = await prisma.profile.findUnique({ where: { id: args.id } });

        return profile ? profile : null;
      }
    },

  }),
});

export class Schema extends GraphQLSchema {
  constructor() {
    super({
      query: RootQuery,
    });
  }
};
