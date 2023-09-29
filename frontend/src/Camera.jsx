import React, { Component } from 'react';

class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      cameraOn: false,
      audioOn: false,
    };
  }

  componentDidMount() {
    this.initializeCamera();
  }

  initializeCamera() {
    const { cameraOn, audioOn } = this.state;

    const constraints = {
      video: cameraOn,
      audio: audioOn,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      });
  }

  toggleCamera = () => {
    this.setState(
      (prevState) => ({ cameraOn: !prevState.cameraOn }),
      () => {
        // Reinitialize the camera with updated settings
        this.initializeCamera();
      }
    );
  };

  toggleAudio = () => {
    this.setState(
      (prevState) => ({ audioOn: !prevState.audioOn }),
      () => {
        // Reinitialize the camera with updated settings
        this.initializeCamera();
      }
    );
  };

  render() {
    const { cameraOn, audioOn } = this.state;

    return (
      <div>
        <h1>Camera App</h1>
        <div>
          <button onClick={this.toggleCamera}>
            {cameraOn ? 'Camera Off' : 'Camera On'}
          </button>
          <button onClick={this.toggleAudio}>
            {audioOn ? 'Audio Off' : 'Audio On'}
          </button>
        </div>
        <video ref={this.videoRef} autoPlay playsInline />
      </div>
    );
  }
}

export default CameraApp;
