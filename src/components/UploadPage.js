import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', video);
    formData.append('title', title);

    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8080/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Upload successful!');
  };

  return (
    <div style={{ padding: '2rem', background: '#141414', height: '100vh', color: 'white' }}>
      <h2>Upload a New Video</h2>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPage;
