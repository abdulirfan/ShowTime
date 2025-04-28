import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ProtectedLayout from './components/ProtectedLayout';
import Footer from './components/Footer';
import VideoPlayer from './components/VideoPlayer';
import StreamPage from './components/StreamPage';
import VideoPlayerPage from './components/VideoPlayerPage';

function App() {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video-player" element={<VideoPlayerPage />} />
          <Route path="/video-player/:id" element={<VideoPlayer />} />
          {/*<Route path="/upload" element={role === 'admin' ? <UploadPage /> : <Navigate to="/dashboard" />} />*/}
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/stream" element={<StreamPage />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
