import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', video);
    formData.append('title', title);
    formData.append('description', description);

    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8080/upload', formData, {
      /*headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }*/
        withCredentials: true
    });

    alert('Upload successful!');
  };

  return (
    <div style={{ padding: '2rem', background: '#141414', height: '100vh', color: 'white', marginTop: '30px' }}>
      <h2>Upload a New Video</h2>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: '10px', padding: '10px', width: '100%', height: '100px', marginTop: '30px'}}></textarea>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPage;
