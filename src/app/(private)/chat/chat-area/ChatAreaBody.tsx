"use client";
import { GetChatMessage } from "@/server-actions/message";
import { StoreStateType } from "@/store/redux-store";
import MessageType from "@/types/message-type";
import { logError, logInfo } from "@/utils/log";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageBox from "./components/MessageBox";

const ChatAreaBody = () => {
  const [msgs, setMsgs] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedChat } = useSelector((state: StoreStateType) => state.chat);

  useEffect(() => {
    async function getMessages() {
      try {
        setLoading(true);
        const res = await GetChatMessage(selectedChat?._id!);
        if ("error" in res) throw new Error("Error Loading Messages...");
        setMsgs(res);
        logInfo(res);
      } catch (error: any) {
        logError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, [selectedChat]);

  return (
    <main
      className="border rounded-xl flex flex-col gap-2 p-3 h-full overflow-y-auto"
    >
      {msgs.map((msg) => (
        <MessageBox key={msg._id} msg={msg} />
      ))}
    </main>
  );
};

export default ChatAreaBody;
