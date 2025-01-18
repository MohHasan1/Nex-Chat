import { GetUserChatList } from "@/server-actions/chat";
import { StoreStateType } from "@/store/redux-store";
import { SetChats } from "@/store/slices/chat-slice";
import { logError } from "@/utils/log";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useReFetchChats = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);

  const [reFetch, setReFetchChats] = useState<boolean>(false)

  useEffect(() => {
    async function SetInitialData() {
      try {
        // current user's chat list //
        const chatList = await GetUserChatList(currentUserId!);
        if ("error" in chatList) throw new Error("Error Fetching Chats");

        dispatch(SetChats(chatList));
      } catch (error) {
        logError("Error fetching user info:", error);
      }
    }

    SetInitialData();
  }, [currentUserId, dispatch, reFetch]);

  return setReFetchChats;
};

export default useReFetchChats;
