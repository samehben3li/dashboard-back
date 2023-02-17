import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Flags from '../pages/Flags';
import Login from '../pages/Login';
import RiskCategories from '../pages/RiskCategories';
import RiskCategory from '../pages/RiskCategory';
import Users from '../pages/Users';
import ProtectedRoute from '../utils/ProtectedRoute';
import { Sidebar } from './Sidebar';

function RouterContainer() {
  return (
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
  );
}

export default RouterContainer;
