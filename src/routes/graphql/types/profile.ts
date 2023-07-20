import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeEnum } from './member.js';
import { PrismaClient } from '@prisma/client';
import { IProfile } from '../entities/profile.js';

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeEnum },
    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }: IProfile, _args, prisma: PrismaClient) => {
        return await prisma.memberType.findUnique({ where: { id: memberTypeId } });
      }
    }
  }),
});

const ProfileListType = new GraphQLList(new GraphQLNonNull(ProfileType));

export { ProfileType, ProfileListType };
