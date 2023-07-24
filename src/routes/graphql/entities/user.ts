import { SubscribersOnAuthors } from "@prisma/client";
import { IPost } from "./post.js";
import { IProfile } from "./profile.js";

interface IUser {
  id: string;
  name: string;
  balance: number;
  profile: IProfile;
  posts: IPost[];
  userSubscribedTo: SubscribersOnAuthors[];
  subscribedToUser: SubscribersOnAuthors[];
}

interface ISubscribe {
  userId: string,
  authorId: string,
}

type CreateUserDTO = Pick<IUser, 'name' | 'balance'>;
type ChangeUserDTO = Pick<IUser, 'name'>;

interface ICreateUser {
  dto: CreateUserDTO;
};

interface IChangeUser {
  id: string;
  dto: ChangeUserDTO;
};

export { IUser, ICreateUser, IChangeUser, ISubscribe};
