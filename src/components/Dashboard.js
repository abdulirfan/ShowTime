import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const mockVideos = [
      {
        id: 1,
        title: 'The Great Escape',
        thumbnailUrl: 'https://images.unsplash.com/photo-1605844797540-c705624fa599?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXNjYXBlfGVufDB8MHwwfHx8MA%3D%3D'
      },
      {
        id: 2,
        title: 'Action Hero Returns',
        thumbnailUrl: 'https://plus.unsplash.com/premium_photo-1682097996857-b1519db4dc31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVyb3xlbnwwfDB8MHx8fDA%3D'
      },
      {
        id: 3,
        title: 'Mystery Island',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 4,
        title: 'Romantic Sunset',
        thumbnailUrl: 'https://images.unsplash.com/photo-1693487321577-9a772f52f1d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0fGVufDB8MHwwfHx8MA%3D%3D'
      },
      {
        id: 5,
        title: 'Comedy Scene',
        thumbnailUrl: 'https://plus.unsplash.com/premium_photo-1705883064439-07604389d8a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbWVkeXxlbnwwfDB8MHx8fDA%3D'
      },
      {
        id: 6,
        title: 'Documentary Landscape',
        thumbnailUrl: 'https://images.unsplash.com/photo-1662364370236-a3ef523f11e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXNsYW5kfGVufDB8MHwwfHx8MA%3D%3D'
        
      }
    ];

    setVideos(mockVideos);
  }, []);

  const handleVideoClick = async (id) => {
    const video = videos.find(v => v.id === id);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Playing video: ${response.data.title}`);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  return (
    <div style={{ background: '#141414', minHeight: '100vh', padding: '2rem', color: 'white', marginTop: '30px', marginBottom: '30px' }}>
      <h2>Recommended for You</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {videos.map(video => (
          <div key={video.id} style={{ cursor: 'pointer' }} onClick={() => handleVideoClick(video.id)}>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
