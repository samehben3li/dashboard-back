import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Login from './pages/Login';
import client from './utils/client';
import Users from './pages/Users';
import { Sidebar } from './components/Sidebar';
import { useAuth } from './hooks';
import RiskCategories from './pages/RiskCategories';
import RiskCategory from './pages/RiskCategory';
import { AppContextProvider } from './context/AppContext';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <div className="container">
          <Sidebar />
          <div className="body">
            <Routes>
              <Route path="/" element={isLoggedIn ? <Users /> : <Login />} />
              <Route
                path="/riskCategories"
                element={isLoggedIn ? <RiskCategories /> : <Login />}
              />
              <Route
                path="/riskCategories/:id"
                element={isLoggedIn ? <RiskCategory /> : <Login />}
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
