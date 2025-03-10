import React, { useState, useEffect } from 'react';
import './SplashScreen.css'; // Import CSS for splash screen styling
import logo from '../test/image/logo.png';  // Import the image here

function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 ms = 3 seconds

    return () => clearTimeout(timer); // Clean up timer when component unmounts
  }, []);

  return (
    <div className={`splash-screen ${isLoading ? 'visible' : 'hidden'}`}>
      <img src={logo} alt="logo" className="logo" />  {/* Use imported logo */}
      <h1 className="title">Welcome to LawMatch</h1>
      <p className="credits">Loading...</p>
      <div className="loader-container">
        <div className="loader"></div>

      </div>
    </div>
  );
}

export default SplashScreen;
