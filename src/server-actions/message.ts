/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import chat from "@/models/chat-model";
import message from "@/models/message-model";
import MessageType from "@/types/message-type";
import { cloneOrSerialize } from "@/utils/cloneOrSerialize";
import { revalidatePath } from "next/cache";

export const SendNewMessage = async (msgPayload: Partial<MessageType>) => {
  try {
    // message
    const newMsg: MessageType = new message(msgPayload);
    await newMsg.save();

    // chat
    await chat.findByIdAndUpdate(msgPayload.chat, {
      lastMessage: newMsg._id,
    });

    return { success: "Message sent successfully" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetChatMessage = async (chatId: string) => {
  try {
    const msgs: MessageType[] = await message
      .find({ chat: chatId })
      .sort({ createdAt: 1 })
      .populate("sender");

    return cloneOrSerialize(msgs);
  } catch (error: any) {
    return { error: error.message };
  }
};
