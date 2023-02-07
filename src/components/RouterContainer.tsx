import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Flags from '../pages/Flags';
import Login from '../pages/Login';
import RiskCategories from '../pages/RiskCategories';
import RiskCategory from '../pages/RiskCategory';
import Users from '../pages/Users';
import { Sidebar } from './Sidebar';

function RouterContainer() {
  const { isLoggedIn } = useAuth();
  return (
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
          <Route path="/flags" element={isLoggedIn ? <Flags /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default RouterContainer;
