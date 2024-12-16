"use client";
import { GetUserChatList } from "@/server-actions/chat";
import { GetCurrentUserFromMongo } from "@/server-actions/user";
import { SetChats } from "@/store/slices/chat-slice";
import {
  SetCurrentUserData,
  SetCurrentUserId,
} from "@/store/slices/user-slice";
import { logError } from "@/utils/log";
import { useUser } from "@clerk/nextjs";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

const InitialDataLoader = ({ children }: { children: ReactNode }) => {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    async function SetInitialData() {
      try {
        // current user //;
        const currentUser = await GetCurrentUserFromMongo();
        if ("error" in currentUser) throw new Error("Current User Not Found");
        dispatch(SetCurrentUserId(currentUser._id));
        dispatch(SetCurrentUserData(currentUser));

        // user's chat list //
        const chatList = await GetUserChatList(currentUser?._id);
        if ("error" in chatList) throw new Error("Error Fetching Chats");
        dispatch(SetChats(chatList));
      } catch (error) {
        logError("Error fetching user info:", error);
      }
    }

    if (isSignedIn && user) {
      SetInitialData();
    }
  }, [dispatch, isSignedIn, user]);

  return <>{children}</>;
};

export default InitialDataLoader;
