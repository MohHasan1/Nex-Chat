import UserType from "@/types/user-type";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUserData: null,
    currentUserId: null,
  },
  reducers: {
    SetCurrentUserData: (state, action) => {
      state.currentUserData = action.payload;
    },
    SetCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});

export type UserStateType = {
  currentUserData: UserType | null;
  currentUserId: string | null;
};

export const { SetCurrentUserData, SetCurrentUserId } = userSlice.actions;

export default userSlice;
