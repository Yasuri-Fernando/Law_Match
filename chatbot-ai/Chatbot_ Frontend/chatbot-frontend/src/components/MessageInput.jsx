import React, { useState } from 'react';
import axios from 'axios';

const MessageInput = ({ onReceiveMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          question: input
        });

        onReceiveMessage({ text: input, sender: 'user' });
        onReceiveMessage({ text: response.data.response, sender: 'bot' });

        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Sri Lankan law..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
