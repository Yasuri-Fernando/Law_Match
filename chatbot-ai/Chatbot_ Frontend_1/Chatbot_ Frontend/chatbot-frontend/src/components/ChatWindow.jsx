import React from 'react';

const ChatWindow = ({ messages = [] }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
