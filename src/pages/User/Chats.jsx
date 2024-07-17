import React, { useContext, useEffect, useState } from "react";
import {
  socketContext,
  userContext,
  token,
  validToken,
} from "../../helpers/context";
import { useNavigate as navigate, useNavigate } from "react-router-dom";
function Chats() {
  let navigate = useNavigate();
  const socket = useContext(socketContext);
  let [tokenStatus, setTokenStatus] = useState(useContext(validToken));
  let [userLoggedIn, setUserLoggedIn] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      let data = { text: inputMessage, sender: userLoggedIn.username };
      setMessages([...messages, data]);
      // You can also make an API call here to send the message to a server or bot
      socket.emit("send_message", [...messages, data]);
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (validToken === false) {
      navigate("/login");
    }
    userLoggedIn = setUserLoggedIn(userContext);
    socket.on("message_received", (data) => {
      setMessages(data);
    });
  }, [socket]);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col">Public Chat</div>
              <div className="col text-end">{userLoggedIn.username}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="chat-widget">
            <div className="chat-messages">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`d-flex ${
                      message.sender === userLoggedIn.username
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`col-3 message-container ${
                        message.sender === userLoggedIn.username
                          ? "text-end"
                          : "text-start"
                      }`}
                    >
                      <span
                        className={`${
                          message.sender === userLoggedIn.username
                            ? "message-text-you"
                            : "message-text-other"
                        }`}
                      >
                        {message.text}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-sm text-muted">
                  Berbincang di platform ini bersifat sementara
                </div>
              )}
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
