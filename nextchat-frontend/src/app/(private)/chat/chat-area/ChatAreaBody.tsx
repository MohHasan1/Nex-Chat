/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GetChatMessage } from "@/server-actions/message";
import { StoreStateType } from "@/store/redux-store";
import MessageType from "@/types/message-type";
import { logError } from "@/utils/log";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageBox from "./_components/MessageBox";

const ChatAreaBody = () => {
  const [msgs, setMsgs] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedChat } = useSelector(
    (state: StoreStateType) => state.chat
  );

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
