import React, { use, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const user = useSelector((store) => store.user.user);
  const [targetOnline, setTargetOnline] = useState({
    online: false,
    timestamp: null,
  });

  const targetConnectionInfo = useSelector(
    (store) => store.connection.connections
  );
  const userId = user?._id;
  const matchedUser = targetConnectionInfo.find(
    (conn) => String(conn.userId) === String(targetUserId)
  );

  // Scroll to bottom when messages change
  //as soon as the page loads join the chat
  const socketRef = useRef(null);

  const getChats = async () => {
    const response = await fetch(BASE_URL + "/chats/" + targetUserId, {
      credentials: "include", // fetch's way of setting cookies
    });
    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }
    const data = await response.json();
    if (data) {
      const chatMessages = data.chat.messages.map((msg) => ({
        firstName: msg.sender.firstName,
        id: msg._id, // usually Mongoose returns _id
        sender: msg.sender._id === userId ? "you" : msg.sender.firstName, // usually msg.sender
        text: msg.text,
        time: msg.time,
      }));
      setMessages(chatMessages);
      return chatMessages;
    }
  };
  useEffect(() => {
    getChats();
  }, [targetUserId, userId]);

  useEffect(() => {
    // Ensure both user and target are defined
    if (!userId || !targetUserId) {
      return;
    }
    const socket = createSocketConnection(BASE_URL);
    socketRef.current = socket;
    // const roomId = [userId, targetUserId].sort().join("-");
    // console.log("Joining room:", roomId);

    // Listen for online/offline updates
    socket.on("userOnline", (data) => {
      if (data.userId === targetUserId) {
        setTargetOnline({ online: data.online, timestamp: data.timestamp });
      }
    });
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("receiveMessage", (msg) => {
      const sender = msg.userId === userId ? "you" : "them";
      setMessages((prevMessages) => [...prevMessages, { ...msg, sender }]);
    });
    return () => {
      socket.emit("leaveChat", userId, targetUserId);
      socket.off("receiveMessage");
      socket.disconnect();
    }; // return function in useEffect to leave the chat and disconnect socket
  }, [userId, targetUserId]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input change
  const handleInput = (e) => setInput(e.target.value);

  // Mock send
  const sendMessage = () => {
    if (input.trim() === "") return;
    const socket = socketRef.current; // <-- FIXED!
    if (!socket) return; // optional, for safety
    const message = {
      id: Date.now(), // <-- Use "id" for consistency!
      userId,
      sender: "me",
      firstName: user.firstName,
      targetUserId,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    console.log("Sending message:", message);

    setInput("");
    socket.emit("sendMessage", message);
  };

  // Allow send on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center pt-8 pb-0">
      {/* Top Chat Heading */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-4xl mb-3 text-orange-700 font-mono font-bold text-center tracking-wide">
          Chat
        </div>
      </div>
      {/* Chat Header */}

      {/* Chat Area */}
      <div
        className="
        flex flex-col flex-1
        w-full max-w-3xl
        bg-yellow-50 rounded-2xl border border-orange-300
        shadow-[0_3px_8px_0_#f59e42]
        px-4 py-2
        mb-4
        overflow-hidden
        min-h-[50vh]
        "
        style={{
          height: "65vh",
          minHeight: "320px",
          maxHeight: "70vh",
        }}
      >
        <div className="flex items-center gap-4 mb-4  rounded-full pr -3 pt-2">
          {matchedUser ? (
            <>
              <img
                src={matchedUser.photoUrl}
                alt={matchedUser.firstName}
                className="w-16 h-16 object-cover rounded-full border-2 border-orange-300"
              />
              <div>
                <div className="font-bold font-mono text-2xl text-orange-950">
                  {matchedUser.firstName} {matchedUser.lastName}
                </div>
                {/* ONLINE STATUS INDICATOR */}
                <div
                  className={`px-2 mt-1 inline-block border rounded-2xl text-sm
        ${
          targetOnline.online
            ? "bg-green-600 text-white  border-green-800"
            : "bg-gray-300 text-gray-700 font-serif border-gray-400"
        }`}
                >
                  {targetOnline.online ? (
                    "Online"
                  ) : targetOnline.timestamp ? (
                    <>
                      Offline
                      <span className="ml-2 text-xs font-mono text-gray-400">
                        (last seen{" "}
                        {new Date(targetOnline.timestamp).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                        )
                      </span>
                    </>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-orange-200">User info not available.</div>
          )}
        </div>
        {/* Message List */}
        <div
          className="flex-1 overflow-y-auto py-4 pr-2 scrollbar-thin"
          style={{ maxHeight: "55vh" }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`
                flex ${m.sender === "you" ? "justify-end" : "justify-start"}
                mb-2
              `}
            >
              <div className="flex flex-col "></div>

              <div
                className={`
                  px-4 py-2 rounded-[1.1em]
                  max-w-[75%] font-mono text-base
                  shadow-[0_2px_2px_0_#f59e42]
                  ${
                    m.sender === "you"
                      ? "bg-yellow-200 text-right text-gray-900"
                      : "bg-yellow-100 text-left text-gray-800 border border-orange-200"
                  }
                  `}
              >
                <div className="text-xs flex text-orange-400 mt-1 text-right">
                  <h5 className="text-xs text-gray-400 flex-col mr-2">
                    {m.sender}
                  </h5>
                  {m.time}
                </div>
                <span>{m.text}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-2 border-t border-orange-200 pt-2 bg-yellow-50">
          <input
            className="
              flex-1 font-mono px-4 py-2 rounded-lg
              border border-orange-300 bg-yellow-100
              placeholder-orange-300 text-gray-700
              shadow-[0_1px_0_0_#f59e42]
              focus:outline-none focus:border-orange-400
              transition-all duration-150
            "
            placeholder="Type your message..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="
              px-5 py-2 rounded-lg font-mono bg-yellow-400 text-gray-900
              border border-orange-400
              shadow-[0_3px_0_0_#f59e42]
              transition-all duration-100
              hover:shadow-[0_1.5px_0_0_#f59e42]
              active:shadow-none active:translate-y-1
              select-none cursor-pointer
            "
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
