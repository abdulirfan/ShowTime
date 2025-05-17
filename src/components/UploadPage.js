import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UploadPage = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailSource, setThumbnailSource] = useState('');

  const videoPreviewRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!video) {
      alert('Please select a video first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', video);
    formData.append('title', title);
    formData.append('description', description);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:8080/admin/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Upload successful!');

    setVideo(null);
    setTitle('');
    setDescription('');
    setThumbnail(null);
    setThumbnailSource('');

    const videoId = response.data;
    // navigate(`/video-player/${videoId}`);
    navigate(`/hls-video-player/${videoId}`);
  };

  const handleCaptureThumbnail = () => {
    const videoElement = videoPreviewRef.current;
    const canvasElement = canvasRef.current;
    if (!videoElement || !canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    canvasElement.toBlob((blob) => {
      setThumbnail(blob);
    }, 'image/jpeg', 0.95);
  };

  return (
    <div style={{ padding: '2rem', background: '#141414', minHeight: '100vh', color: 'white', marginTop: '30px' }}>
      <h2>Upload a New Video</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          setVideo(e.target.files[0]);
          setThumbnail(null); 
        }}
        style={{ display: 'block', marginBottom: '10px' }}
      />

      {video && (
        <div style={{ marginBottom: '20px' }}>
          <video
            ref={videoPreviewRef}
            src={URL.createObjectURL(video)}
            controls
            style={{ width: '100%', maxHeight: '300px' }}
          />
        </div>
      )}

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%', height: '100px' }}
      />

      <h3>Select Thumbnail</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="radio"
            value="upload"
            checked={thumbnailSource === 'upload'}
            onChange={() => setThumbnailSource('upload')}
          />
          Upload from system
        </label>

        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="capture"
            checked={thumbnailSource === 'capture'}
            onChange={() => setThumbnailSource('capture')}
          />
          Capture from video
        </label>
      </div>

      {thumbnailSource === 'upload' && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
          }}
          style={{ display: 'block', marginBottom: '20px' }}
        />
      )}

      {thumbnailSource === 'capture' && video && (
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleCaptureThumbnail} style={{ padding: '10px 20px' }}>
            Capture Thumbnail from Video
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button onClick={handleUpload} style={{ padding: '10px 20px', backgroundColor: '#ff4500', color: 'white', border: 'none', marginBottom: '30px' }}>
        Upload Video
      </button>
    </div>
  );
};

export default UploadPage;
