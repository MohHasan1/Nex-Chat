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
import UserType from "@/types/user-type";
import ChatType from "@/types/chat-type";

const ChatSideBarChats = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const handleClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const [currUser, setCurrUser] = useState<UserType>();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const { currentUserId }: UserStateType = useSelector(
  //   (state: any) => state.user
  // );

  useEffect(() => {
    async function getChatList() {
      try {
        setLoading(true);
        const currUser = await GetCurrentUserFromMongo();
        if ("error" in currUser) throw new Error("") 
        const res = await GetUserChatList(currUser?._id);
        if ("error" in res) throw new Error("") 

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
              {loading && (
                <LoaderPinwheel className="animate-spin mx-auto w-full" />
              )}
              {chats.map((chat: any) => {
                const user = chat.users.find(
                  (u: any) => u._id !== currUser!._id
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
