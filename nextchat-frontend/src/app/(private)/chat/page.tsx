import React from "react";
import ChatSideBar from "./chat-sidebar/ChatSideBar";
import ChatArea from "./chat-area/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <>
      {/* SidebarProvider min-h is overwritten*/}
      <SidebarProvider
        style={{ height: "calc(100dvh - 8rem)" }}
        className="flex min-h-full"
      >
        {/* <SidebarTrigger className="block md:hidden" /> */}
        <ChatSideBar />
        <ChatArea />
      </SidebarProvider>
    </>
  );
};

export default Page;
