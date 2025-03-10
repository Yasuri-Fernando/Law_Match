import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation to Sign Up page
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import the ForgotPasswordModal component
import "./SignIn.css"; // Importing the CSS file for styling

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign in logic (API call or form submission)
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault(); // Prevents the default Link behavior
    setShowModal(true); // Show the modal when the Forgot Password link is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="sign-in-page">
      <div className="form-container">
        <div className="form-content">
          <h1>LawMatch</h1>
          <h3>Sign In to your account</h3>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <span>Sign Up</span>
            </Link>
          </p>
          <form onSubmit={handleSignIn}>
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>
            {/* Keep only the first Forgot Password link */}
            <ForgotPasswordModal showModal={showModal} handleCloseModal={handleCloseModal} />
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
            <p>or sign in with</p>
            <div className="social-login">
              <button className="social-btn google-btn">G</button>
              <button className="social-btn facebook-btn">F</button>
              <button className="social-btn twitter-btn">T</button>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      
    </div>
  );
};

export default SignIn;
