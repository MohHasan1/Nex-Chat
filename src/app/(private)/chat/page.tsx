import React from "react";
import ChatSideBar from "./chat-sidebar/ChatSideBar";
import ChatArea from "./chat-area/ChatArea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <>
      <SidebarProvider className="flex min-h-full">
        <ChatSideBar />
        <SidebarTrigger />
        <ChatArea />
      </SidebarProvider>
    </>
  );
};

export default Page;
