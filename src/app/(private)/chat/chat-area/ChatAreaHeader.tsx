/* eslint-disable @next/next/no-img-element */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreStateType } from "@/store/redux-store";
import { useSelector } from "react-redux";

const ChatAreaHeader = () => {
  const { selectedChat } = useSelector((state: StoreStateType) => state.chat);

  if (!selectedChat) return undefined;
  return (
    <header className="flex gap-4 justify-start items-center py-4 px-2 pointer-events-none">
      <Avatar>
        <AvatarImage src={selectedChat?.profilePictureUrl} />
        <AvatarFallback>SUP</AvatarFallback>
      </Avatar>

      <h1>{selectedChat?.username}</h1>
    </header>
  );
};

export default ChatAreaHeader;
