import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your AI Legal Assistant. How can I help you with Sri Lankan law today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const recentQuestions = [
    "How to get a divorce in Sri Lanka",
    "What are the grounds for divorce?",
    "Property division after divorce",
    "Child custody rights",
    "Marriage registration process"
  ];

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true); // Show loading state

    try {
      const res = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const botResponse = Array.isArray(data.response) ? data.response.join("\n") : data.response;

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error connecting to the chatbot." }]);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="app-container">
      <Sidebar recentQuestions={recentQuestions} onSelectQuestion={handleSendMessage} />
      <div className="chat-container">
        <ChatWindow messages={messages} />
        {loading && <div className="loading">Thinking...</div>}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
