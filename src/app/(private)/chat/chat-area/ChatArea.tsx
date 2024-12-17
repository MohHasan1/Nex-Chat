import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatAreaBody from "./ChatAreaBody";
import ChatAreaFooter from "./ChatAreaFooter";

const ChatArea = () => {
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
