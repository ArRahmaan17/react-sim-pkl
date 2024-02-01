import React, { useEffect, useState } from "react";
import Root from "../../routes/Root";
const { io } = require("socket.io-client");

function Chats() {
  const socket = io("http://127.0.0.1:3001");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      // You can also make an API call here to send the message to a server or bot
      socket.emit("send_message", { text: inputMessage, sender: "user" });
      setInputMessage("");
    }
  };

  useEffect(() => {
    socket.on("message_received", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket]);

  return (
    <>
      <Root />
      <div className="container">
        <div className="card">
          <div className="chat-widget">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-container ${message.sender}`}
                >
                  <span className="message-text">{message.text}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={handleInputChange}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chats;
