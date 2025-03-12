import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import NGODirectory from './components/NGODirectory';
import CourtLocator from './components/CourtLocator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ngos" element={<NGODirectory />} />
          <Route path="/courts" element={<CourtLocator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;