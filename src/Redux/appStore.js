import { configureStore } from "@reduxjs/toolkit";
import logedinReducer from "./slices/loginSlices";
import feedReducer from "./slices/feedSlices";
import connectionReducer from "./slices/connectionSlice";
import requestReducer from "./slices/RequestSlice";
const store = configureStore({
  reducer: {
    login: logedinReducer,
    feedDetails: feedReducer,
    connections: connectionReducer,
    request: requestReducer,
  },
});

export default store;
