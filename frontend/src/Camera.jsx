import React, { useState, useEffect, useRef } from "react";

function CameraApp() {
  const [cameraOn, setCameraOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    initializeCamera();
  }, [cameraOn, audioOn]);

  const initializeCamera = () => {
    const constraints = {
      video: cameraOn,
      audio: audioOn,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  };

  const toggleCamera = () => {
    setCameraOn((prevCameraOn) => !prevCameraOn);
  };

  const toggleAudio = () => {
    setAudioOn((prevAudioOn) => !prevAudioOn);
  };

  return (
    <div>
      <h1>Camera App</h1>
      <div>
        <button onClick={toggleCamera}>
          {cameraOn ? "Camera Off" : "Camera On"}
        </button>
        <button onClick={toggleAudio}>
          {audioOn ? "Audio Off" : "Audio On"}
        </button>
      </div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default CameraApp;
