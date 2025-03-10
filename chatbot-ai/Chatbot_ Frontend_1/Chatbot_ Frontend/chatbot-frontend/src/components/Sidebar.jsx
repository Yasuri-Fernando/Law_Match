import React from 'react';

const Sidebar = ({ recentQuestions = [], onSelectQuestion }) => {
  return (
    <div className="sidebar">
      <h2>Recent Questions</h2>
      <ul>
        {recentQuestions.map((question, index) => (
          <li key={index} onClick={() => onSelectQuestion(question)}>
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
