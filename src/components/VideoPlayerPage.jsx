import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const VideoPlayerPage = () => {
  const { id } = useParams();

  const videoSrc = `http://localhost:8080/stream/video/${id}`;

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Now Playing</h2>
      <VideoPlayer src={videoSrc} />
    </div>
  );
};

export default VideoPlayerPage;
