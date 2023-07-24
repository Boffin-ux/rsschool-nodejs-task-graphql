import { GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo } from 'graphql';
import { UserListType, UserType } from '../types/user.js';
import { MemberListType, MemberType, MemberTypeEnum } from '../types/member.js';
import { PostListType, PostType } from '../types/post.js';
import { ProfileListType, ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { IProfile } from '../entities/profile.js';
import { IPost } from '../entities/post.js';
import { IUser } from '../entities/user.js';
import { IMemberType } from '../entities/member.js';
import { IContext } from '../types/interface.js';
import { parseResolveInfo } from 'graphql-parse-resolve-info';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: MemberListType,
      resolve: async (_parent, _args, { prisma }: IContext) => {
        return await prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeEnum } },
      resolve: async (_parent, { id }: IMemberType, { prisma }: IContext) => {
        return await prisma.memberType.findUnique({ where: { id } });
      },
    },

    users: {
      type: UserListType,
      resolve: async (
        _parent,
        _,
        { prisma, subscribedToLoader, subscribersLoader }: IContext,
        info: GraphQLResolveInfo,
      ) => {
        const parseInfo = parseResolveInfo(info);
        const isSubscribedTo = !!parseInfo?.fieldsByTypeName.User['userSubscribedTo'];
        const isSubscribers = !!parseInfo?.fieldsByTypeName.User['subscribedToUser'];

        const users = await prisma.user.findMany({
          include: {
            userSubscribedTo: isSubscribedTo,
            subscribedToUser: isSubscribers,
          },
        });

        isSubscribers && users.forEach((user) => subscribersLoader.prime(user.id, user));
        isSubscribedTo && users.forEach((user) => subscribedToLoader.prime(user.id, user));

        return users;
      },
    },

    user: {
      type: UserType as GraphQLObjectType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }: IUser, { usersLoader }: IContext) => {
        return await usersLoader.load(id);
      },
    },

    posts: {
      type: PostListType,
      resolve: async (_parent, _args, { prisma }: IContext) => {
        return await prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }: IPost, { prisma }: IContext) => {
        return await prisma.post.findUnique({ where: { id } });
      },
    },

    profiles: {
      type: ProfileListType,
      resolve: async (_parent, _args, { prisma }: IContext) => {
        return await prisma.profile.findMany();
      },
    },

    profile: {
      type: ProfileType as GraphQLObjectType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: IProfile, { prisma }: IContext) => {
        return await prisma.profile.findUnique({ where: { id: args.id } });
      },
    },
  }),
});
