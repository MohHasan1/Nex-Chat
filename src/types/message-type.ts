import { Types } from "mongoose";

type MessageType = {
  _id: Types.ObjectId;
  chat: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  image?: string;
  readBy: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export default MessageType;
