import { createSlice } from "@reduxjs/toolkit";

const chatListSlice = createSlice({
  name: "chatList",
  initialState: [], // Initialize chatList to an empty array
  reducers: {
    setChatList: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChatList } = chatListSlice.actions;
export default chatListSlice.reducer;
