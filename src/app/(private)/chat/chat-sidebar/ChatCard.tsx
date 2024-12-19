/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatType from "@/types/chat-type";
import UserType from "@/types/user-type";

const ChatCard = ({ user, chat, currentUserId }: ChatCardProps) => {
  // receiver has not yet read the msgs that where sent to him/her // 
  const unReadCounts = chat?.unReadCounts?.[currentUserId] || 0;

  return (
    <section className="flex justify-left items-center gap-4 cursor-pointer w-full">
      <Avatar>
        <AvatarImage
          src={user?.profilePictureUrl}
          alt="User's profile picture"
        />
        <AvatarFallback>UP</AvatarFallback>
      </Avatar>

      <div className="flex justify-between items-center w-full">
        <h1 className="font-sand font-medium">{user?.username}</h1>
        {unReadCounts !== 0 && <div className="rounded-1 size-1 bg-red-600"></div>}
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
