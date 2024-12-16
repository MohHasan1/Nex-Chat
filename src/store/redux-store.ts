import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import chatSlice from "./slices/chat-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
