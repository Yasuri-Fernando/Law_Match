import React from "react";
import "./Solutions.css";

const Solutions = () => {
  return (
    <section className="solutions">
      <h2>Our Solutions</h2>
      <div className="solution-cards">
        <div className="card">
          <img src="src/assets/chatbot.png" alt="AI Chat Bot" className="card-img" />
          <h3>AI Chat Bot</h3>
          <p>
            An intelligent chatbot that guides users through legal processes by
            understanding natural language inputs and providing tailored assistance.
          </p>
        </div>
        <div className="card">
          <img src="src/assets/law_insight.png" alt="Law Insight" className="card-img" />
          <h3>Law Insight</h3>
          <p>
            A powerful tool that analyzes user queries to fetch and simplify
            relevant laws, precedents, and legal acts.
          </p>
        </div>
        <div className="card">
          <img src="src/assets/location_service.png" alt="Location Service" className="card-img" />
          <h3>Location Service</h3>
          <p>
            A geolocation-enabled feature that helps users find nearby legal
            resources, including court houses and legal aid centers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
