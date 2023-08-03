import { createSlice } from "@reduxjs/toolkit";

const chatIdsSlice = createSlice({
  name: "chatIds",
  initialState: null, // Initialize chatIds to null or a default value
  reducers: {
    setChatIds: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChatIds } = chatIdsSlice.actions;
export default chatIdsSlice.reducer;
