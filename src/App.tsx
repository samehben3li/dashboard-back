import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="body">
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
