import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

interface IContext {
  prisma: PrismaClient;
  memberTypeLoader: DataLoader<string, MemberType>;
  profileLoader: DataLoader<string, Profile>;
  postsLoader: DataLoader<string, Post[]>;
  usersLoader: DataLoader<string, User>;
  subscribedToLoader: DataLoader<string, User>;
  subscribersLoader: DataLoader<string, User>;
}

export { IContext };
