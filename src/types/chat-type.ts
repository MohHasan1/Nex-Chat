import { Document } from "mongoose";
import UserType from "./user-type";

interface IChat {
  _id: string;
  users: string[] | UserType[];
  createdBy: string;
  lastMessage?: string;
  chatImgUrl?: string;
  isGroupChat: boolean;
  groupName?: string;
  groupBio: string;
  groupAdmins?: string[];
  unReadCounts: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

type ChatType = IChat & Document;

export default ChatType;
