import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation to Sign In page
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import the ForgotPasswordModal component
import "./SignUp.css"; // Importing the CSS file for styling

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic (API call or form submission)
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault(); // Prevents the default Link behavior
    setShowModal(true); // Show the modal when the Forgot Password link is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="sign-up-page">
      <div className="form-container">
        <div className="form-content">
          <h1>LawMatch</h1>
          <h3>Create a new account</h3>
          <p>
            Already have an account?{" "}
            <Link to="/signin">
              <span>Login</span>
            </Link>
          </p>
          <form onSubmit={handleSignUp}>
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
            {/* Use the existing Forgot Password link and link it to the modal */}
            <ForgotPasswordModal showModal={showModal} handleCloseModal={handleCloseModal} />
            <button type="submit" className="sign-up-btn">
              Sign Up
            </button>
            <p>or sign up with</p>
            <div className="social-login">
              <button className="social-btn google-btn">G</button>
              <button className="social-btn facebook-btn">F</button>
              <button className="social-btn twitter-btn">T</button>
            </div>
          </form>
        </div>
      </div>

      
      
    </div>
  );
};

export default SignUp;
