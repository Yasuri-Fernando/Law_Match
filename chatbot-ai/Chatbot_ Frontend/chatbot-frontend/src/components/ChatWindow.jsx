import React, { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleReceiveMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
          {msg.text}
        </div>
      ))}
      <MessageInput onReceiveMessage={handleReceiveMessage} />
    </div>
  );
};

export default ChatWindow;
