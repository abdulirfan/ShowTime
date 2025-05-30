import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useParams } from "react-router-dom";

export default function HLSVideoPlayer() {
    const { videoId } = useParams();
  const videoRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const video = videoRef.current;

    const hls = new Hls({
        xhrSetup: (xhr) => {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        },
    });

    const videoUrl = `http://localhost:8080/hls/video/${videoId}/master.m3u8`;
    hls.loadSource(videoUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(console.warn);
    });
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      muted
      style={{ width: "100%", height: "480px", backgroundColor: "black" }}
    />
  );
}
