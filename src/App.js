import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import IssueList from "./components/IssueList";
import IssueForm from "./components/IssueForm";
import IssuesMap from "./components/IssuesMap";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token already exists (auto-login persistence).
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // After successful login/signup
  const handleAuthSuccess = () => setIsAuthenticated(true);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          // Show only login/signup before authentication
          <Routes>
            <Route path="/login" element={<Login onLogin={handleAuthSuccess} />} />
            <Route path="/signup" element={<Signup onSignup={handleAuthSuccess} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          // Authenticated users get dashboard and other pages
          <>
          <div className="top-header">
            <nav>
              <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
              <Link to="/issues" style={{ marginRight: 10 }}>Issue List</Link>
              <Link to="/report" style={{ marginRight: 10 }}>Report Issue</Link>
              <Link to="/map" style={{ marginRight: 10 }}>Map View</Link>
              
            </nav>
            <button className="logout-btn" onClick={handleLogout} style={{ marginLeft: 10 }}>
                Logout
              </button>
            </div>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/issues" element={<IssueList />} />
              <Route path="/report" element={<IssueForm />} />
              <Route path="/map" element={<IssuesMap />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
