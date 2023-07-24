import { IMemberType } from "./member.js";

interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
  memberType: IMemberType;
}

type CreateProfileDTO = Omit<IProfile, 'id' | 'memberType'>;
type ChangeProfileDTO = Pick<IProfile, 'isMale' | 'yearOfBirth'>;

interface ICreateProfile {
  dto: CreateProfileDTO;
};

interface IChangeProfile {
  id: string;
  dto: ChangeProfileDTO;
};

export { IProfile, ICreateProfile, IChangeProfile };