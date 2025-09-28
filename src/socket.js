import { io } from "socket.io-client";
import { BaseURL } from "./utils/constant";

// Replace with your backend URL

export const SocketRequestConnection = () => {
  if (location.hostname == "localhost") {
    return io(BaseURL, {
      withCredentials: true, // important if you’re using cookies/auth
      transports: ["websocket"], // ensure stable connection
    });
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
