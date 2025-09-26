import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SocketRequestConnection } from "../../socket";
import { BaseURL } from "../../utils/constant";

function Chat() {
  const user = useSelector((store) => store.login);
  const userId = user?._id;
  const { targetId } = useParams();
  const [chatContent, setChatContent] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    getChatList();
    const socket = SocketRequestConnection();
    if (!userId) return;

    socket.emit("joinChat", { firstName: user.firstName, targetId, userId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setChatContent((prev) => [...prev, { firstName: firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetId]);

  useEffect(() => {
    // scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatContent]);

  const handleSendMessage = () => {
    const socket = SocketRequestConnection();
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      targetId,
      userId,
      text: message,
    });
    setMessage("");
    // getChatList();
  };

  const getChatList = async () => {
    try {
      const response = await fetch(`${BaseURL}chat/getChat/${targetId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      const list = data?.messages?.map((chat) => ({
        firstName: chat.senderId.firstName,
        lastName: chat.senderId.lastName,
        text: chat.content,
      }));

      setChatContent(list || []);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="flex flex-col border border-gray-500 w-1/2 h-[80vh] m-auto my-4">
      {/* header */}
      <div className="border-b border-b-gray-500 h-10 w-full p-2 flex items-center">
        {user.firstName}
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chatContent?.length > 0 ? (
          chatContent.map((item, index) => (
            <div
              key={index}
              className={`chat ${
                user?.firstName !== item?.firstName &&
                user?.lastName !== item?.lastName
                  ? "chat-start"
                  : "chat-end"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {item.firstName} {item.lastName}
              </div>
              <div
                className={`chat-bubble ${
                  user?.firstName !== item?.firstName &&
                  user?.lastName !== item?.lastName
                    ? "chat-bubble-secondary"
                    : "chat-bubble-primary"
                } max-w-72`}
              >
                {item.text}
              </div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No messages yet</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* input */}
      <div className="border-t flex items-center space-x-2.5 border-gray-500 p-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="outline-none border bg-gray-900 w-3/4 p-1 rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-soft btn-info px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
