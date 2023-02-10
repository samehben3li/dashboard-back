import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Login from './pages/Login';
import client from './utils/client';
import Users from './pages/Users';
import { Sidebar } from './components/Sidebar';
import RiskCategories from './pages/RiskCategories';
import RiskCategory from './pages/RiskCategory';
import { AppContextProvider } from './context/AppContext';
import Flags from './pages/Flags';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <div className="container">
          <Sidebar />
          <div className="body">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riskCategories"
                element={
                  <ProtectedRoute>
                    <RiskCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riskCategories/:id"
                element={
                  <ProtectedRoute>
                    <RiskCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/flags"
                element={
                  <ProtectedRoute>
                    <Flags />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;
