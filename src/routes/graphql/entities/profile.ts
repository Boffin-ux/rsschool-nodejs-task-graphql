import { IMemberType } from "./member.js";

interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
  memberType: IMemberType;
}

export { IProfile };