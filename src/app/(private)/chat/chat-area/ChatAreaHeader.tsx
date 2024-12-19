/* eslint-disable @next/next/no-img-element */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreStateType } from "@/store/redux-store";
import { useSelector } from "react-redux";

const ChatAreaHeader = () => {
  const { selectedChatUser } = useSelector((state: StoreStateType) => state.chat);

  if (!selectedChatUser) return undefined;
  return (
    <header className="flex gap-4 justify-start items-center py-4 px-2 pointer-events-none">
      <Avatar>
        <AvatarImage src={selectedChatUser?.profilePictureUrl} />
        <AvatarFallback>SUP</AvatarFallback>
      </Avatar>

      <h1>{selectedChatUser?.username}</h1>
    </header>
  );
};

export default ChatAreaHeader;
