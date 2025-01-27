"use server";
import chat from "@/models/chat-model";
import ChatType from "@/types/chat-type";
import { cloneOrSerialize } from "@/utils/cloneOrSerialize";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CreateNewChat = async (payload: Partial<ChatType>) => {
  try {
    const newChat: ChatType = await chat.create(payload);
    return cloneOrSerialize(newChat);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const UpdateChatById = async (
  chatId: string,
  payload: Partial<ChatType>
) => {
  try {
    await chat.findByIdAndUpdate(chatId, payload);
    return { success: "Chat updated successfully!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetUserChatList = async (userId: string) => {
  try {
    const res: ChatType[] = await chat
      .find({ users: { $in: [userId] } })
      .populate("users")
      .populate("createdBy")
      .populate("groupAdmins")
      .sort({ updatedAt: -1 });

    return res.map(cloneOrSerialize);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetChatById = async (chatId: string) => {
  try {
    const res = await chat.findById(chatId);

    return cloneOrSerialize(res);
  } catch (error: any) {
    return { error: error.message };
  }
};


