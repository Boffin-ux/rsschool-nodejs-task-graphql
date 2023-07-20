import { GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLEnumType, GraphQLNonNull } from 'graphql';

const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

const MemberListType = new GraphQLList(new GraphQLNonNull(MemberType));

export { MemberType, MemberListType, MemberTypeEnum };