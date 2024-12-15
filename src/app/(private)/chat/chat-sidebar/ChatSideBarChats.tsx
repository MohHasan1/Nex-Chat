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
import { GetUserChatList } from "@/server-actions/chat";
import { GetCurrentUserFromMongo } from "@/server-actions/user";
import { logError, logInfo } from "@/utils/log";
import { useEffect, useState } from "react";
import ChatCard from "../chat-components/ChatCard";
import { LoaderPinwheel } from "lucide-react";

const ChatSideBarChats = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const handleClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const [currUser, setCurrUser] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getChatList() {
      try {
        setLoading(true);
        const currUser = await GetCurrentUserFromMongo();
        const res = await GetUserChatList(currUser?._id);

        logInfo(res);
        setChats(res);
        setCurrUser(currUser);
      } catch (error: any) {
        logError(error);
      } finally {
        setLoading(false);
      }
    }

    getChatList();
  }, []);

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="cursor-default">
            Chats {loading}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {loading &&  <LoaderPinwheel className="animate-spin mx-auto w-full" />}
              {chats.map((chat: any) => {
                const user = chat.users.find(
                  (u: any) => u._id !== currUser._id
                );
                return (
                  <SidebarMenuItem key={chat._id}>
                    <SidebarMenuButton
                      isActive={user._id === activeButton}
                      onClick={() => handleClick(user._id)}
                    >
                      <ChatCard user={user} key={user._id} />
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
