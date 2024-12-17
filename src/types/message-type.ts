import { Document } from "mongoose";
import UserType from "./user-type";

interface IMessage {
  _id?: string;
  chat: string;
  sender: string | UserType;
  text: string;
  image?: string;
  readBy?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

type MessageType = IMessage & Document;

export default MessageType;
