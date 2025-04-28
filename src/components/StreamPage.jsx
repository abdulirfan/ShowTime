import React from "react";
import VideoPlayer from "./VideoPlayer";

function StreamPage() {
  const videoId = "123"; 

  return (
    <div>
      <h1>Streaming Video</h1>
      <VideoPlayer videoId={videoId} />
    </div>
  );
}

export default StreamPage;
