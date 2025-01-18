/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GetChatMessage } from "@/server-actions/message";
import { StoreStateType } from "@/store/redux-store";
import MessageType, { IMessage } from "@/types/message-type";
import { logError, logInfo } from "@/utils/log";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageBox from "./_components/MessageBox";
import socket from "@/config/socket-config";
import dayjs from "dayjs";

const ChatAreaBody = () => {
  const [msgs, setMsgs] = useState<Partial<MessageType>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedChat } = useSelector((state: StoreStateType) => state.chat);

  useEffect(() => {
    async function getMessages() {
      // the fun will not run (return undefined) when initially mounts //
      if (!selectedChat) return;
      try {
        setLoading(true);
        const res = await GetChatMessage(selectedChat?._id);
        if ("error" in res) throw new Error("Error Loading Messages...");
        setMsgs(res.reverse());
      } catch (error: any) {
        logError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on("received_message", (payload) => {
      logInfo(payload);

      if (payload.chat._id === selectedChat?._id) {
        const new_msg: IMessage = {
          _id: dayjs().unix().toString(),
          chat: payload.chat._id,
          sender: payload.sender,
          text: payload.text,
          image: payload.image,
          readBy: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Check for duplicate by matching socketId
        setMsgs((prevState) => {
          const isDuplicate = prevState.some(
            (msg) => msg?.socketId === payload.socketId
          );

          if (!isDuplicate) {
            // Only add new message if it's not a duplicate
            return [new_msg, ...prevState];
          }
          return prevState;
        });
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("received_message");
    };
  }, [selectedChat]); // Only depend on selectedChat to avoid infinite rerenders

  return (
    <main className="border rounded-xl flex flex-col gap-2 p-3 h-full overflow-y-auto">
      {loading && <div className="text-center">Loading chats ...</div>}
      {msgs.map((msg) => (
        <MessageBox key={msg._id} msg={msg} />
      ))}
    </main>
  );
};

export default ChatAreaBody;
