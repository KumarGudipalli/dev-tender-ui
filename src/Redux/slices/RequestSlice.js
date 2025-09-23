import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
     
      let newRequests = state.filter((x) => x._id != action.payload);
      return newRequests;
    },
  },
});

export const { addRequest, removeRequest } = RequestSlice.actions;
export default RequestSlice.reducer;
