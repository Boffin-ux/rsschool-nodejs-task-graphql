import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeEnum } from './member.js';
import { IProfile } from '../entities/profile.js';
import { IContext } from './interface.js';

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
      resolve: async ({ memberTypeId }: IProfile, _, { memberTypeLoader }: IContext) => {
        return await memberTypeLoader.load(memberTypeId);
      }
    },
  }),
});

const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {type: GraphQLBoolean},
    yearOfBirth: {type: GraphQLInt},
    userId: {type: new GraphQLNonNull(UUIDType)},
    memberTypeId: {type: new GraphQLNonNull(MemberTypeEnum)},
  }),
});

const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {type: GraphQLBoolean},
    yearOfBirth: {type: GraphQLInt},
  }),
});

const ProfileListType = new GraphQLList(new GraphQLNonNull(ProfileType));

export { ProfileType, ProfileListType, CreateProfileInputType, ChangeProfileInputType };
