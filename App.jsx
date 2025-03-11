import React from 'react';
    import './App.css';
    import Sidebar from './components/Sidebar';
    import Header from './components/Header';
    import AddlawyerForm from './components/AddlawyerForm';

    function App() {
      return (
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Header />
            <main className="main-content">
              <AddlawyerForm />
            </main>
          </div>
        </div>
      );
    }

    export default App;
