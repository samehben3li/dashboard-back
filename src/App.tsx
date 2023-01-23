import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import './app.scss';

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <div className="dashboard-body">
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
