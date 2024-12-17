import { StoreStateType } from "@/store/redux-store";
import MessageType from "@/types/message-type";
import UserType from "@/types/user-type";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const MessageBox = ({ msg }: { msg: MessageType }) => {
  //   const { selectedChat } = useSelector((state: StoreStateType) => state.chat);
  // maybe add user profile later
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);

  // type cast //
  const sender = msg.sender as UserType;

  return (
    <div className="flex flex-col items-end gap-1">
      <div
        key={msg._id}
        className={`border border-purple-800
        ${
          sender._id === currentUserId ? "ml-auto" : "mr-auto"
        } border w-fit py-2 px-4 rounded-xl`}
      >
        <span className="font-inter text-md">{msg.text}</span>
      </div>
      <span className="text-xs text-gray-400">
        {dayjs(msg.createdAt).format("DD-MM-YYYY HH:mm")}
      </span>
    </div>
  );
};

export default MessageBox;

// Note to future me, even-though we save sender as sender's _Id in mongo, when we fetch we populate the sender with
// UserType object - Also check the interface it's string|UserType as its can be both - string when saving, UserType when fetching.
// I also took teh same approach for chat (and message here)
