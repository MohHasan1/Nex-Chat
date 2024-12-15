"use server";
import chat from "@/models/chat-model";
import ChatType from "@/types/chat-type";
import { cloneOrSerialize } from "@/utils/cloneOrSerialize";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CreateNewChat = async (payload: Partial<ChatType>) => {
  try {
    const newChat = await chat.create(payload);
    return cloneOrSerialize(newChat);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetUserChatList = async (userId: string) => {
  try {
    const res = await chat.find({ users: { $in: [userId] } }).populate("users");
    return res.map(cloneOrSerialize);
  } catch (error: any) {
    return { error: error.message };
  }
};
