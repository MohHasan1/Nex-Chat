/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/config/socket-config";
import { SendNewMessage } from "@/server-actions/message";
// import { SendNewMessage } from "@/server-actions/message";
import { StoreStateType } from "@/store/redux-store";
import { logError } from "@/utils/log";
import dayjs from "dayjs";
import { useState, KeyboardEvent  } from "react";
import { useSelector } from "react-redux";

const ChatAreaFooter = () => {
  // const { toast } = useToast();
  const [msg, setMsg] = useState<string>("");
  const { currentUserData: currUser } = useSelector(
    (state: StoreStateType) => state.user
  );
  const { selectedChat } = useSelector((state: StoreStateType) => state.chat);

  async function handleSend() {
    if (msg === "") return;

    try {
      const commonPayload = {
        text: msg,
        image: "",
      };

      // send msg using socket - msg should be displayed on both sender and receivers chat //
      const socketPayload = {
        ...commonPayload,
        chat: selectedChat,
        sender: currUser,
        socketId: dayjs().unix(),
      };

      socket.emit("new-message", socketPayload);

      // Store msg in mongodb //
      const msgPayload = {
        ...commonPayload,
        chat: selectedChat?._id,
        sender: currUser?._id,
      };

      const res = await SendNewMessage(msgPayload);
      if ("error" in res) throw new Error(res.error);

      // empty the input //
      setMsg("");
    } catch (error: any) {
      logError(error);
    }
  }

  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default Enter key behavior (e.g., form submit)
      handleSend(); // Calls the handleSend function when Enter is pressed
    }
  }

  return (
    <footer className="flex justify-center items-center gap-4 py-4 px-2">
      {/* <Button variant={"outline"} className="rounded-xl">
        Emoji
      </Button> */}
      <Input
        value={msg as string}
        onChange={(e) => setMsg(e.target.value)}
        className="rounded-xl font-sand font-medium"
        type="text"
        placeholder="message/text"
        onKeyDown={handleEnter}
      />
      <Button variant={"outline"} onClick={handleSend} className="rounded-xl">
        Send
      </Button>
    </footer>
  );
};

export default ChatAreaFooter;
