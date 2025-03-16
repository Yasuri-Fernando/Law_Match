import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router for navigation
import "./Solutions.css";

const Solutions = () => {
  return (
    <section className="solutions">
      <h2>Our Solutions</h2>
      <div className="solution-cards">
        <div className="card">
          <img
            src="src/assets/chatbot.png"
            alt="AI Chat Bot"
            className="card-img"
          />
          <h3>AI Chat Bot</h3>
          <p>
            An intelligent chatbot that guides users through legal processes
            by understanding natural language inputs and providing tailored
            assistance.
          </p>
          <Link to="/ai-chat-bot">
            <button className="cta-button">Start Using AI Chat Bot</button>
          </Link>
        </div>

        <div className="card">
          <img
            src="src/assets/law_insight.png"
            alt="Law Insight"
            className="card-img"
          />
          <h3>Law Insight</h3>
          <p>
            A powerful tool that analyzes user queries to fetch and simplify
            relevant laws, precedents, and legal acts.
          </p>
          <Link to="/law-insight">
            <button className="cta-button">Start Using Law Insight</button>
          </Link>
        </div>

        <div className="card">
          <img
            src="src/assets/location_service.png"
            alt="Location Service"
            className="card-img"
          />
          <h3>Location Service</h3>
          <p>
            A geolocation-enabled feature that helps users find nearby legal
            resources, including court houses and legal aid centers.
          </p>
          <Link to="/location-service">
            <button className="cta-button">Find Legal Resources</button>
          </Link>
        </div>
      </div>

      {/* New Document Automation Card */}
      <div className="document-automation">
        <img
          src="src/assets/document_automation.png"
          alt="Document Automation"
          className="card-img"
        />
        <h3>Document Automation</h3>
        <p>
          Easily generate professional legal documents in minutes with our
          automated document creation feature. Streamline your legal workflows
          and enhance productivity.
        </p>
        <Link to="/document-automation">
          <button className="cta-button">Start Automating Documents</button>
        </Link>
      </div>
    </section>
  );
};

export default Solutions;
