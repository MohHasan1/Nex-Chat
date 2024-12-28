"use client";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatAreaBody from "./ChatAreaBody";
import ChatAreaFooter from "./ChatAreaFooter";
import { useSelector } from "react-redux";
import { StoreStateType } from "@/store/redux-store";

const ChatArea = () => {
  const { selectedChatUser } = useSelector(
    (state: StoreStateType) => state.chat
  );

  if (!selectedChatUser) {
    return (
      <div className="flex-1 flex flex-col border m-2 p-2 rounded-xl text-center">
        Start chatting
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col border m-2 p-2 rounded-xl">
        <ChatAreaHeader />
        <ChatAreaFooter />
        <ChatAreaBody />
      </div>
    </>
  );
};

export default ChatArea;
