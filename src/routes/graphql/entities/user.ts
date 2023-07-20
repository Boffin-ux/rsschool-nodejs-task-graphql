import { IPost } from "./post.js";
import { IProfile } from "./profile.js";

interface IUser {
  id: string;
  name: string;
  balance: number;
  profile: IProfile;
  posts: IPost[]; 
}

export { IUser };
