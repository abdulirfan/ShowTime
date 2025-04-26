import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ProtectedLayout from './components/ProtectedLayout';
import Footer from './components/Footer';

function App() {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={role === 'admin' ? <UploadPage /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
