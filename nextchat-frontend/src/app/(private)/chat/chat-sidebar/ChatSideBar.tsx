import { Sidebar } from "@/components/ui/sidebar";
import ChatSideBarChats from "./ChatSideBarChats";
import ChatSideBarHeader from "./ChatSideBarHeader";

const ChatSideBar = () => {
  return (
    <>
      <aside className="relative">
        <Sidebar collapsible="icon" variant="floating" className="absolute h-full">
          <ChatSideBarHeader />
          <ChatSideBarChats />
        </Sidebar>
      </aside>
    </>
  );
};

export default ChatSideBar;
