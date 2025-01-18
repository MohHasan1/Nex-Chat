import React from "react";
import ChatSideBar from "./chat-sidebar/ChatSideBar";
import ChatArea from "./chat-area/ChatArea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <>
      {/* SidebarProvider min-h is overwritten*/}
      <SidebarProvider
        style={{ height: "calc(100dvh - 8rem)" }}
        className="flex min-h-full relative"
      >
        <SidebarTrigger className="block md:hidden absolute inset-4 text-violet-500" />
        <ChatSideBar />
        <ChatArea />
      </SidebarProvider>
    </>
  );
};

export default Page;
