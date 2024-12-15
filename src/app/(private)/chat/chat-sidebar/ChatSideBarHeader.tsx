"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import NewChat from "../chat-components/NewChat";
import NewGroup from "../chat-components/NewGroup";

const ChatSideBarHeader = () => {
  const { open } = useSidebar();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={`flex ${open && "justify-between items-center"}`}>
          <div className={`flex ${open ? "block" : "hidden"}`}>
            <NewChat />
            <NewGroup />
          </div>
          <SidebarTrigger />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default ChatSideBarHeader;
