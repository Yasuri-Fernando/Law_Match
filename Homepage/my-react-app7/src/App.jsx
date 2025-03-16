import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // React Router setup
import "./App.css"; // Import main CSS file
import DocumentAutomation from "./Components/DocumentAutomation"; // Import DocumentAutomation component
import Footer from "./Components/Footer"; // Import Footer component
import Header from "./Components/Header"; // Import Header component
import LandingPage from "./Components/LandingPage"; // Landing Page Component
import SignIn from "./Components/SignIn"; // Sign In Page Component
import SignUp from "./Components/SignUp"; // Sign Up Page Component
import Solutions from "./Components/Solutions"; // Solutions Page Component

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route (with Header and Footer) */}
        <Route path="/" element={<><Header /><LandingPage /><Footer /></>} />

        {/* Sign In Route (without Header and Footer) */}
        <Route path="/signin" element={<SignIn />} />

        {/* Sign Up Route (without Header and Footer) */}
        <Route path="/signup" element={<SignUp />} />

        {/* Other Routes with Header and Footer */}
        <Route path="/solutions" element={<><Header /><Solutions /><Footer /></>} />

        {/* Document Automation Route */}
        <Route path="/document-automation" element={<><DocumentAutomation /></>} />
        
      </Routes>
    </Router>
  );
}

export default App;