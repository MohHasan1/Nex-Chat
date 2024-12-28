import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserStateType } from "./slices/user-slice";
import chatSlice, { ChatStateType } from "./slices/chat-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export type StoreStateType = {
  user: UserStateType;
  chat: ChatStateType;
};

export default store;
