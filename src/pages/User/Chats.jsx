import React, { useContext, useEffect, useState } from "react";
import Root from "../../routes/Root";
import { socketContext } from "../../helpers/context";

function Chats() {
  const socket = useContext(socketContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      let data = { text: inputMessage, sender: "user" };
      setMessages([...messages, data]);
      // You can also make an API call here to send the message to a server or bot
      socket.emit("send_message", [...messages, data]);
      setInputMessage("");
    }
  };

  useEffect(() => {
    socket.on("message_received", (data) => {
      setMessages(data);
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
