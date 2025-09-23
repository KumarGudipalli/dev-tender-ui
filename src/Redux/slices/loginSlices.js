import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUser } = loginSlice.actions;

export default loginSlice.reducer;
