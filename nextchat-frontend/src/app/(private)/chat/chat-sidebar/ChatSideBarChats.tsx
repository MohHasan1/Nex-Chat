/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import ChatCard from "./_components/ChatCard";
import { LoaderPinwheel } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { StoreStateType } from "@/store/redux-store";
import {
  SetSelectedChat,
  SetSelectedChatUser,
} from "@/store/slices/chat-slice";
import UserType from "@/types/user-type";
import ChatType from "@/types/chat-type";
import { ClearUnreadCount } from "@/server-actions/message";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

const ChatSideBarChats = () => {
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);
  const { chats, selectedChat } = useSelector(
    (state: StoreStateType) => state.chat
  );

  const dispatch = useDispatch();
  const handleClick = async (chat: ChatType, selectedUser: UserType) => {
    dispatch(SetSelectedChat(chat));
    dispatch(SetSelectedChatUser(selectedUser));

    // reset the unReadCount for the user for the clicked chat //
    await ClearUnreadCount(currentUserId!, chat._id);
  };

  // const router = useRouter();
  // useEffect(() => {
  //   router.refresh();
  // }, []);

  // tempo //
  const loading = false;

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="cursor-default">
            Chats
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {loading && (
                <LoaderPinwheel className="animate-spin mx-auto w-full" />
              )}
              {chats.map((chat) => {
                const user = (chat.users as UserType[]).find(
                  (u) => u._id !== currentUserId
                );

                return (
                  <SidebarMenuItem key={chat._id}>
                    <SidebarMenuButton
                      size={"lg"}
                      isActive={chat?._id === selectedChat?._id}
                      onClick={() => handleClick(chat, user!)}
                    >
                      <ChatCard
                        chat={chat}
                        user={user!}
                        currentUserId={currentUserId!}
                        key={chat._id}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
};

export default ChatSideBarChats;

// note to future me in chat-type the users array hold ids of 2 users, but when we fetch we populate with userType object.
