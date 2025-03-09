import React from "react";
import { Link } from "react-router-dom"; // Using Link for navigation
import "./Header.css"; // Importing the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">LawMatch.</div>
      <nav className="nav">
        <a href="#">Law Insights</a>
        <a href="#">Templates</a>
        <a href="#">Locations</a>
        <a href="#">About</a>
      </nav>
      <div className="auth">
        {/* Login Button wrapped in Link to navigate to Sign In page */}
        <Link to="/signin">
          <button className="btn-login">Login</button>
        </Link>

        {/* Sign In Button with Rounded and White Style */}
        <Link to="/signin">
          <button className="btn-signin">Sign In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
