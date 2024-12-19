/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import chat from "@/models/chat-model";
import message from "@/models/message-model";
import MessageType from "@/types/message-type";
import { cloneOrSerialize } from "@/utils/cloneOrSerialize";

export const SendNewMessage = async (msgPayload: Partial<MessageType>) => {
  try {
    // message
    const newMsg: MessageType = new message(msgPayload);
    await newMsg.save();

    // update chat
    const prevChat = await chat.findById(msgPayload.chat);
    const prevUnReadCounts = prevChat?.unReadCounts || {};
    const senderCast = msgPayload.sender as string;

    // Store the receiver's id and incremental counts (depends on message sender sends) in the unread count //
    // To get the number of unread msgs, we will use the receiver's id and check how many unread msgs receiver has not yet read //
    prevChat?.users.forEach((user) => {
      const receiverCast = user.toString();

      if (receiverCast !== senderCast) {
        prevUnReadCounts[receiverCast] =
          (prevUnReadCounts[receiverCast] || 0) + 1;
      }
    });

    await chat.findByIdAndUpdate(msgPayload.chat, {
      lastMessage: newMsg._id,
      unReadCounts: prevUnReadCounts,
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

// userId is the receiver id - currently logged in user //
export const ClearUnreadCount = async (userId: string, chatId: string) => {
  try {
    const prevChat = await chat.findById(chatId);
    const prevUnReadCounts = prevChat?.unReadCounts;
    // The object would have a static key literally named "userId", not the value stored in the userId so use []
    const newUnreadCounts = { ...prevUnReadCounts, [userId]: 0 };

    await chat.findByIdAndUpdate(chatId, {
      unReadCounts: newUnreadCounts,
    });

    return { success: "cleared" };
  } catch (error: any) {
    return { error: error.message };
  }
};
