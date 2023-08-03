import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
const messagesSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      state.push(...action.payload);
    },
    resetMessages: (state) => {
      state.length = 0;
    },
    appendMessage: (state, action) => {
      return produce(state, (draftState) => {
        draftState.push(...action.payload);
      });
    },
  },
});

export const { setMessages, resetMessages, appendMessage} =
  messagesSlice.actions;
export default messagesSlice.reducer;
