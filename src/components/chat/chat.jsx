import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SocketRequestConnection } from "../../socket";
import { BaseURL } from "../../utils/constant";

function Chat() {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.login);
  const userId = user?._id;
  const { targetId } = useParams();
  const [chatContent, setChatContent] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected)); // show preview
    console.log(selected);
  };

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
  console.log("imageUrl", currentUser);
  const handleSendMessage = async () => {
    const socket = SocketRequestConnection();
    if (!message.trim() && !file) return;

    let imageUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      const res = await fetch(BaseURL + "files/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      imageUrl = data.fileUrl;

      setFile(null);
      setPreview(null);
    }

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      targetId,
      userId,
      text: message,
      img: imageUrl,
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
      console.log("img", data);
      const list = data?.messages?.map((chat) => ({
        firstName: chat.senderId.firstName,
        lastName: chat.senderId.lastName,
        text: chat.content,
        imageUrl: chat.imageUrl,
      }));
      const user = data?.participants.filter((item) => item._id == targetId);
      setCurrentUser(user[0]);
      setChatContent(list || []);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="flex flex-col border border-gray-500 w-1/2 h-[80vh] m-auto my-4">
      {/* header */}
      {currentUser != null && (
        <div className="border-b border-gray-500 h-10 w-full p-2 flex items-center">
          {currentUser?.firstName + " " + currentUser?.lastName}
        </div>
      )}

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chatContent?.length > 0 ? (
          chatContent.map((item, index) => (
            <div
              key={index}
              className={`chat ${
                user?.firstName !== item?.firstName ? "chat-start" : "chat-end"
              }`}
            >
              {(item.text || item.imageUrl != null) && (
                <div className="chat-bubble max-w-72">
                  {item.text && <p>{item.text}</p>}
                  {item.imageUrl && item.imageUrl != null && (
                    <img
                      src={item.imageUrl}
                      alt="chat-img"
                      className="max-w-[200px] rounded mt-1"
                    />
                  )}
                </div>
              )}
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

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-16 h-16 object-cover rounded"
          />
        )}

        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="hidden"
          id="imageUpload"
        />
        <label htmlFor="imageUpload" className="cursor-pointer text-2xl">
          🖼️
        </label>

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
