import { StoreStateType } from "@/store/redux-store";
import MessageType from "@/types/message-type";
import UserType from "@/types/user-type";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const MessageBox = ({ msg }: { msg: Partial<MessageType> }) => {
  //   const { selectedChat } = useSelector((state: StoreStateType) => state.chat);
  // maybe add user profile later
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);

  // type cast //
  const sender = msg.sender as UserType;
  

  return (
    <div
      className={`flex flex-col gap-1 justify-center ${
        sender._id === currentUserId
          ? "ml-auto items-end"
          : "mr-auto items-start"
      }  `}
    >
      <div
        key={msg._id}
        className={`border backdrop-blur-2xl  ${
          sender._id === currentUserId
            ? " border-purple-900 bg-purple-900/30"
            : " border-violet-400 bg-violet-400/30"
        }
        w-fit py-2 px-4 rounded-xl flex-wrap`}
      >
        <span className="font-inter text-md ">{msg.text}</span>
      </div>
      <div className="text-xs font-sand flex justify-center items-center gap-1 pointer-events-none">
        <span className="text-purple-300 truncate max-w-16">{sender.username}</span>
        <span className="text-slate-400">
          {dayjs(msg.createdAt).format("DD-MM-YYYY")}
        </span>
        <span className="text-gray-300">
          {dayjs(msg.createdAt).format("hh:mm A")}
        </span>
      </div>
    </div>
  );
};

export default MessageBox;

// Note to future me, even-though we save sender as sender's _Id in mongo, when we fetch we populate the sender with
// UserType object - Also check the interface it's string|UserType as its can be both - string when saving, UserType when fetching.
// I also took teh same approach for chat (and message here)
