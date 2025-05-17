import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ videoId }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // fetching the video in Chunks of 1MB size
        // Partial Content is returned by backend in response
        const videoUrl = `http://localhost:8080/stream/video/range/${videoId}`;

        // getting and streaming the whole video at once
        // const videoUrl = `http://localhost:8080/stream/video/${videoId}`;

        const securedSrc = `${videoUrl}?token=Bearer ${token}`;
        videoRef.current.src = securedSrc;

        playerRef.current = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            muted: true,
            preload: "auto",
        });        
    }, []);

    return (
        <div>
            <div data-vjs-player>
                <video
                    ref={videoRef}
                    style={{ width: "100%", height: "500px" }}
                    className="video-js vjs-default-skin"
                ></video>
            </div>
        </div>
    );
}

export default VideoPlayer;
