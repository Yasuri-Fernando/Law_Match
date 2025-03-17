import React from "react";
import heroImage from "../assets/law_man.jpg"; // Adjust this path to your image location
import "./LandingPage.css"; // Importing the CSS file
import Solutions from "./Solutions"; // Import the Solutions component

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          
          <h1>How AI is Redefining</h1>
          <h2>Revolutionize your legal journey</h2>
          <p>
            To provide empowering and transformative legal solutions that cater
            to each client's distinct vision and needs.
          </p>
          <div className="hero-buttons">
            {/* Link to navigate to Sign In page */}
            <a href="/signin">
              <button className="btn-primary">Sign In</button>
            </a>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Justice Scales" className="hero-img" />
        </div>
      </section>

      {/* Solutions Section */}
      <Solutions />
    </>
  );
};

export default LandingPage;
