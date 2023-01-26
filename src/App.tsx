import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Login from './pages/Login';
import client from './utils/client';
import Users from './pages/Users';
import SideBar from './components/Sidebar/Sidebar';
import useAuth from './hooks/useAuth';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <SideBar />
        <div className="body">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Users /> : <Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
