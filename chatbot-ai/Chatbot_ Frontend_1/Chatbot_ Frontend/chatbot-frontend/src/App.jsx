import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your AI Legal Assistant. How can I help you with Sri Lankan law today?" }
  ]);

  const recentQuestions = [
    "How to get a divorce in Sri Lanka",
    "What are the grounds for divorce?",
    "Property division after divorce",
    "Child custody rights",
    "Marriage registration process"
  ];

  const handleSendMessage = (text) => {
    setMessages([...messages, { sender: 'user', text }, { sender: 'bot', text: "Processing..." }]);
    
    // Simulating API response
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages.slice(0, -1), { sender: 'bot', text: "Here's your legal answer." }]);
    }, 1000);
  };

  return (
    <div className="app-container">
      <Sidebar recentQuestions={recentQuestions} onSelectQuestion={handleSendMessage} />
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
