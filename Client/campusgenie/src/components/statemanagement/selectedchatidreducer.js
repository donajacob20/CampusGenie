import { createSlice } from "@reduxjs/toolkit";

const selectedChatIdSlice = createSlice({
  name: "selectedChatId",
  initialState: null, // Initialize chatIds to null or a default value
  reducers: {
    setSelectedChatId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedChatId } = selectedChatIdSlice.actions;
export default selectedChatIdSlice.reducer;
