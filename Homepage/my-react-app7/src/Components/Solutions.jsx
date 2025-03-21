import { Book, Download, FileText, Video } from 'lucide-react';
import React from "react";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import "./Solutions.css";

const Solutions = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const solutions = [
    {
      title: "AI Chat Bot",
      description: "An intelligent chatbot that guides users through legal processes by understanding natural language inputs and providing tailored assistance.",
      icon: <FileText size={24} />,
      link: "/ai-chat-bot"
    },
    {
      title: "Law Insight",
      description: "A powerful tool that analyzes user queries to fetch and simplify relevant laws, precedents, and legal acts.",
      icon: <Video size={24} />,
      link: "/law-insight"
    },
    {
      title: "Location Service",
      description: "A geolocation-enabled feature that helps users find nearby legal resources, including court houses and legal aid centers.",
      icon: <Book size={24} />,
      link: "/location-service"
    },
    {
      title: "Graph Feature",
      description: "Visualize your legal data and insights with our advanced graphing tool, providing meaningful charts and reports for better analysis.",
      icon: <Download size={24} />,
      link: "/graph-feature"
    },
    {
      title: "Document Automation",
      description: "Easily generate professional legal documents in minutes with our automated document creation feature. Streamline your legal workflows and enhance productivity.",
      icon: <FileText size={24} />,
      link: "/document-automation"
    }
  ];

  return (
    <section id="solutions" className={`solutions ${inView ? 'visible' : ''}`} ref={ref}>
      <h2>Our Solutions</h2>
      <div className="solution-cards">
        {solutions.map((solution, index) => (
          <div 
            key={index} 
            className="card"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="card-icon">{solution.icon}</div>
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
            <Link to={solution.link}>
              <button className="cta-button">Start Using {solution.title}</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;