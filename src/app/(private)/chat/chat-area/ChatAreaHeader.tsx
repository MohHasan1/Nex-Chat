/* eslint-disable @next/next/no-img-element */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreStateType } from "@/store/redux-store";
import { useSelector } from "react-redux";
import ChatInfo from "./_components/ChatInfo";

const ChatAreaHeader = () => {
  const { selectedChatUser, selectedChat } = useSelector(
    (state: StoreStateType) => state.chat
  );

  if (!selectedChat) return undefined;

  if (selectedChat.isGroupChat) {
    return (
      <header className="flex justify-center items-center">
        <div className="flex gap-4 justify-start items-center py-4 px-2 pointer-events-none">
          <Avatar>
            <AvatarImage src={selectedChat.chatImgUrl} />
            <AvatarFallback className={`bg-fuchsia-800`}>
              <div>G</div>
            </AvatarFallback>
          </Avatar>

          <h1>{selectedChat?.groupName}</h1>
        </div>

        <ChatInfo chat={selectedChat} chatUser={selectedChatUser!} />
      </header>
    );
  }

  return (
    <header className="flex justify-center items-center">
      <div className="flex gap-4 justify-start items-center py-4 px-2 pointer-events-none">
        <Avatar>
          <AvatarImage src={selectedChatUser?.profilePictureUrl} />
          <AvatarFallback>SUP</AvatarFallback>
        </Avatar>

        <h1>{selectedChatUser?.username}</h1>
      </div>
      <ChatInfo chat={selectedChat} chatUser={selectedChatUser!} />
    </header>
  );
};

export default ChatAreaHeader;

// Note: When a chat is selected the chat ans the selected user info is stored in the redux.
// Now when we deal with group, there are more than 2 user, so in chatSidebarChats.tsx
// we only store the first user from the array of user[], and this a simple flaw.
// So i have to handle that here.
