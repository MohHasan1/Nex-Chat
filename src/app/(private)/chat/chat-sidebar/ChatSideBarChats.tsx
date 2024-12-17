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
import ChatCard from "./ChatCard";
import { LoaderPinwheel } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { StoreStateType } from "@/store/redux-store";
import { SetSelectedChat } from "@/store/slices/chat-slice";
import UserType from "@/types/user-type";
import ChatType from "@/types/chat-type";

const ChatSideBarChats = () => {
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);
  const { chats, selectedChat } = useSelector(
    (state: StoreStateType) => state.chat
  );

  const dispatch = useDispatch();
  const handleClick = (user: ChatType) => {
    dispatch(SetSelectedChat(user));
  };

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
                      isActive={user?._id === selectedChat?._id}
                      onClick={() => handleClick(user!)}
                    >
                      <ChatCard user={user!} key={user?._id} />
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
