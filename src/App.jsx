import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LawCourts from './pages/LawCourts';
import LegalNGOs from './pages/LegalNGOs';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courts" element={<LawCourts />} />
            <Route path="/ngos" element={<LegalNGOs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;