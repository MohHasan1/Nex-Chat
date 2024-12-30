import ChatType from "@/types/chat-type";
import UserType from "@/types/user-type";
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedChat: null,
    selectedChatUser: null,
    onlineUsers: [],
  },
  reducers: {
    SetChats: (state, action) => {
      state.chats = action.payload;
    },
    SetSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    SetSelectedChatUser: (state, action) => {
      state.selectedChatUser = action.payload;
    },
    SetOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { SetChats, SetSelectedChat, SetSelectedChatUser, SetOnlineUsers } =
  chatSlice.actions;
export default chatSlice;

export type ChatStateType = {
  chats: ChatType[];
  selectedChat: ChatType | null;
  selectedChatUser: UserType | null;
  onlineUsers: string[];
};
