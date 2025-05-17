import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ProtectedLayout from './components/ProtectedLayout';
import Footer from './components/Footer';
import VideoPlayer from './components/VideoPlayer';

function VideoPlayerWrapper() {
  const { id } = useParams();
  return <VideoPlayer videoId={id} />;
}

function App() {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video-player/:id" element={<VideoPlayerWrapper />} />

          {/* Upload page - accessible only for admin */}
          <Route 
            path="/upload" 
            element={role === 'ROLE_ADMIN' ? <UploadPage /> : <Navigate to="/dashboard" />} 
          />
        </Route>
      </Routes>

      {/* Always visible Footer */}
      <Footer />
    </Router>
  );
}

export default App;
