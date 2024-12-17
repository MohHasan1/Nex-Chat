/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserType from "@/types/user-type";

const ChatCard = ({ user }: { user: UserType }) => {
  return (
    <section className="flex justify-left items-center gap-4 cursor-pointer">
      <Avatar>
        <AvatarImage
          src={user?.profilePictureUrl}
          alt="User's profile picture"
          className="size-10 border border-violet-700"
        />
        <AvatarFallback>UP</AvatarFallback>
      </Avatar>
      <span className="font-sand font-medium">{user?.username}</span>
    </section>
  );
};

export default ChatCard;
