/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreStateType } from "@/store/redux-store";
import ChatType from "@/types/chat-type";
import UserType from "@/types/user-type";
import { useSelector } from "react-redux";

const ChatCard = ({ user, chat, currentUserId }: ChatCardProps) => {
  const { onlineUsers } = useSelector((state: StoreStateType) => state.chat);
  // receiver has not yet read the msgs that where sent to him/her //
  const unReadCounts = chat?.unReadCounts?.[currentUserId] || 0;
  const isGroup = chat.isGroupChat;

  const onlineIndicator = () => {
    if (chat.isGroupChat) return false;

    if (onlineUsers.includes(user._id)) return true;
  };

  return (
    <section className="flex justify-left items-center gap-4 cursor-pointer w-full">
      <Avatar>
        <AvatarImage
          className={`${
            onlineIndicator() && "border-green-600 border-2 rounded-full"
          }`}
          src={isGroup ? undefined : user?.profilePictureUrl}
          alt="User's profile picture"
        />
        <AvatarFallback className={`${isGroup && "bg-fuchsia-800 "}`}>
          {isGroup ? <div>G</div> : <div>UP</div>}
        </AvatarFallback>
      </Avatar>

      <div className="flex justify-between items-center w-full">
        <h1 className="font-sand font-medium">
          {chat.groupName || user?.username}
        </h1>
        {unReadCounts !== 0 && (
          <div className="rounded-1 size-1 bg-red-600"></div>
        )}
      </div>
    </section>
  );
};
type ChatCardProps = {
  currentUserId: string;
  user: UserType;
  chat: ChatType;
};
export default ChatCard;

// I have written code here to handle both group and individual chats //
