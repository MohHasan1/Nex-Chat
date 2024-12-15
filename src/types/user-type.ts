import { Document } from "mongoose";

interface IUser {
  _id: string;
  clerkUserId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
}
type UserType = IUser & Document;

export default UserType;
