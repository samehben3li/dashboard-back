import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Login from './pages/Login';
import client from './utils/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <div className="body">
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
