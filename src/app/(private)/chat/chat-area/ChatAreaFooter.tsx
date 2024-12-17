/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
import { SendNewMessage } from "@/server-actions/message";
import { StoreStateType } from "@/store/redux-store";
import { SetSelectedChat } from "@/store/slices/chat-slice";
import { logError } from "@/utils/log";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatAreaFooter = () => {
  // const { toast } = useToast();
  const [msg, setMsg] = useState<string>("");
  const { currentUserData: currUser } = useSelector(
    (state: StoreStateType) => state.user
  );
  const { selectedChat } = useSelector((state: StoreStateType) => state.chat);

  // temp //
  const dispatch = useDispatch();

  async function handleSend() {
    if (msg === "") return;

    try {
      const msgPayload = {
        chat: selectedChat?._id,
        text: msg,
        image: "",
        sender: currUser?._id,
      };

      const res = await SendNewMessage(msgPayload);
      if ("error" in res) throw new Error(res.error);

      setMsg("");

      // temp //
      dispatch(SetSelectedChat(null));
      dispatch(SetSelectedChat(selectedChat));
    } catch (error: any) {
      logError(error);
    }
  }

  return (
    <footer className="flex justify-center items-center gap-4 py-4 px-2">
      <Button variant={"outline"} className="rounded-xl">
        Emoji
      </Button>
      <Input
        value={msg as string}
        onChange={(e) => setMsg(e.target.value)}
        className="rounded-xl font-sand font-medium"
        type="text"
      />
      <Button variant={"outline"} onClick={handleSend} className="rounded-xl">
        Send
      </Button>
    </footer>
  );
};

export default ChatAreaFooter;