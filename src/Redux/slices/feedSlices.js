import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {},
  reducers: {
    addUsersFeed: (state, action) => {
      return action.payload;
    },
    removeUsersFromFeed: (state, action) => {
      const newUser = state.filter((user) => user._id != action.payload);
      return newUser;
    },
  },
});

export const { addUsersFeed, removeUsersFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
