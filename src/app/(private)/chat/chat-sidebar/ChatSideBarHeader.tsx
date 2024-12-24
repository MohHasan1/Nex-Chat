"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import NewChat from "./_components/NewChat";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ChatSideBarHeader = () => {
  const { open } = useSidebar();
  const router = useRouter();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem
          className={`flex ${open && "justify-around items-center"}`}
        >
          <div
            className={`flex justify-around w-full ${
              open ? "block" : "hidden"
            }`}
          >
            <NewChat />
            {/* <NewGroup /> */}
            <Button
              variant={"link"}
              className="px-1 py-1"
              onClick={() => router.push("/groups/create-group")}
            >
              New group
            </Button>
          </div>
          <SidebarTrigger />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default ChatSideBarHeader;
