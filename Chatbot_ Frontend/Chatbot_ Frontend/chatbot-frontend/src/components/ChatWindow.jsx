import React from "react";

const ChatWindow = ({ messages = [] }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}>
          <span className="message-text">{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
