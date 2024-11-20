import { Types } from "mongoose";

type ChatType = {
  _id: Types.ObjectId;
  users: Types.ObjectId[];
  createdBy: Types.ObjectId;
  lastMessage?: Types.ObjectId;
  chatImgUrl?: string;
  isGroupChat: boolean;
  groupName?: string;
  groupBio: string;
  groupAdmins?: Types.ObjectId[];
  unReadCounts: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
};

export default ChatType;
