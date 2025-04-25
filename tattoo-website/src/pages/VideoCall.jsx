import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend signaling server URL

const VideoCall = ({ user, onEndCall }) => {
  const localVideoRef = useRef(null); // Reference for the local video element
  const remoteVideoRef = useRef(null); // Reference for the remote video element
  const canvasRef = useRef(null); // Reference for the whiteboard canvas
  const [callDuration, setCallDuration] = useState(0); // State for the call timer
  const [isScreenSharing, setIsScreenSharing] = useState(false); // State for screen sharing
  const [callInitialized, setCallInitialized] = useState(false); // State to track if the call is initialized
  const [isMuted, setIsMuted] = useState(false); // State for muting/unmuting audio
  const [isCameraOn, setIsCameraOn] = useState(true); // State for toggling the camera
  const [isWhiteboardVisible, setIsWhiteboardVisible] = useState(false); // State for toggling whiteboard visibility
  const [drawing, setDrawing] = useState(false); // State for drawing mode
  const peerConnection = useRef(null); // Persist peer connection across re-renders
  const localStream = useRef(null); // Persist local stream across re-renders

  // Initialize the call
  useEffect(() => {
    const initializeCall = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        if (videoDevices.length === 0) throw new Error("No video devices found.");

        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: videoDevices[0]?.deviceId ? { exact: videoDevices[0].deviceId } : undefined },
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream.current;
        }

        peerConnection.current = new RTCPeerConnection();

        localStream.current.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, localStream.current);
        });

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, to: user.socketId });
          }
        };

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { offer, to: user.socketId });

        setCallInitialized(true); // Mark call as initialized
      } catch (error) {
        console.error("Error initializing video call:", error);
        alert(error.message || "An unexpected error occurred while initializing the video call.");
      }
    };

    initializeCall();

    const timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);

    return () => {
      clearInterval(timer);
      if (peerConnection.current) peerConnection.current.close();
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [user.socketId]);

  // Format the call duration (seconds to MM:SS)
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Toggle mute/unmute audio
  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  // Start or stop screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!peerConnection.current) {
        throw new Error("Peer connection is not initialized. Please wait for the call to connect.");
      }

      if (isScreenSharing) {
        stopScreenShare();
      } else {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        peerConnection.current.getSenders().forEach((sender) => {
          if (sender.track.kind === "video") {
            sender.replaceTrack(screenTrack);
          }
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenTrack.onended = stopScreenShare;
        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("Error toggling screen sharing:", error);
      alert(error.message || "Unable to toggle screen sharing.");
    }
  };

  const stopScreenShare = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];

      peerConnection.current.getSenders().forEach((sender) => {
        if (sender.track.kind === "video") {
          sender.replaceTrack(videoTrack);
        }
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
    }

    setIsScreenSharing(false);
  };

  // Whiteboard drawing
  const handleCanvasMouseDown = (event) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handleCanvasMouseMove = (event) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    setDrawing(false);
  };

  // Export Canvas Content as Image
  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "whiteboard.png"; // File name
      link.click(); // Trigger the download
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Call Timer */}
      <p className="text-gray-600 text-sm mb-4">Call Duration: {formatDuration(callDuration)}</p>

      {/* Video Section */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-6xl">
        {/* Local Video */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-600 mb-2">{user.name || "You"}</p>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-auto bg-gray-800 rounded-lg shadow-md"
          />
        </div>
        {/* Remote Video */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-600 mb-2">Remote User</p>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-auto bg-gray-800 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={toggleMute}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isMuted ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={toggleCamera}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isCameraOn ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          } text-white`}
        >
          {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        <button
          onClick={toggleScreenShare}
          disabled={!callInitialized}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isScreenSharing ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
        <button
          onClick={onEndCall}
          className="py-3 px-6 rounded-lg shadow-md bg-red-500 hover:bg-red-600 text-white focus:outline-none transition"
        >
          End Call
        </button>
        <button
          onClick={() => setIsWhiteboardVisible((prev) => !prev)}
          className="py-3 px-6 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 text-white focus:outline-none transition"
        >
          {isWhiteboardVisible ? "Hide Whiteboard" : "Show Whiteboard"}
        </button>
      </div>

      {/* Whiteboard Section */}
      {isWhiteboardVisible && (
        <div className="flex flex-col items-center justify-center mt-6 w-full max-w-4xl">
          <p className="text-gray-600 text-sm mb-2">Interactive Whiteboard</p>
          <canvas
            ref={canvasRef}
            className="w-full h-96 border border-gray-300 bg-white shadow-md"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          />
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
              }}
              className="py-3 px-6 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 text-white focus:outline-none transition"
            >
              Clear Whiteboard
            </button>
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) {
                  const image = canvas.toDataURL("image/png");
                  const link = document.createElement("a");
                  link.href = image;
                  link.download = "whiteboard.png"; // File name
                  link.click(); // Trigger the download
                }
              }}
              className="py-3 px-6 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none transition"
            >
              Export Canvas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;









/*import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend signaling server URL

const VideoCall = ({ user, onEndCall }) => {
  const localVideoRef = useRef(null); // Reference for the local video element
  const remoteVideoRef = useRef(null); // Reference for the remote video element
  const canvasRef = useRef(null); // Reference for the whiteboard canvas
  const [callDuration, setCallDuration] = useState(0); // State for the call timer
  const [isScreenSharing, setIsScreenSharing] = useState(false); // State for screen sharing
  const [callInitialized, setCallInitialized] = useState(false); // State to track if the call is initialized
  const [isMuted, setIsMuted] = useState(false); // State for muting/unmuting audio
  const [isCameraOn, setIsCameraOn] = useState(true); // State for toggling the camera
  const [isWhiteboardVisible, setIsWhiteboardVisible] = useState(false); // State for toggling whiteboard visibility
  const [drawing, setDrawing] = useState(false); // State for drawing mode
  const peerConnection = useRef(null); // Persist peer connection across re-renders
  const localStream = useRef(null); // Persist local stream across re-renders

  // Initialize the call
  useEffect(() => {
    const initializeCall = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        if (videoDevices.length === 0) throw new Error("No video devices found.");

        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: videoDevices[0]?.deviceId ? { exact: videoDevices[0].deviceId } : undefined },
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream.current;
        }

        peerConnection.current = new RTCPeerConnection();

        localStream.current.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, localStream.current);
        });

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, to: user.socketId });
          }
        };

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { offer, to: user.socketId });

        setCallInitialized(true); // Mark call as initialized
      } catch (error) {
        console.error("Error initializing video call:", error);
        alert(error.message || "An unexpected error occurred while initializing the video call.");
      }
    };

    initializeCall();

    const timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);

    return () => {
      clearInterval(timer);
      if (peerConnection.current) peerConnection.current.close();
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [user.socketId]);

  // Format the call duration (seconds to MM:SS)
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Toggle mute/unmute audio
  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  // Start or stop screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!peerConnection.current) {
        throw new Error("Peer connection is not initialized. Please wait for the call to connect.");
      }

      if (isScreenSharing) {
        stopScreenShare();
      } else {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        peerConnection.current.getSenders().forEach((sender) => {
          if (sender.track.kind === "video") {
            sender.replaceTrack(screenTrack);
          }
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenTrack.onended = stopScreenShare;
        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("Error toggling screen sharing:", error);
      alert(error.message || "Unable to toggle screen sharing.");
    }
  };

  const stopScreenShare = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];

      peerConnection.current.getSenders().forEach((sender) => {
        if (sender.track.kind === "video") {
          sender.replaceTrack(videoTrack);
        }
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
    }

    setIsScreenSharing(false);
  };

  // Whiteboard drawing
  const handleCanvasMouseDown = (event) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handleCanvasMouseMove = (event) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    setDrawing(false);
  };

  // Export Canvas Content as Image
  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "whiteboard.png"; // File name
      link.click(); // Trigger the download
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">*/
      {/* Call Timer */}
      /*<p className="text-gray-600 text-sm mb-4">Call Duration: {formatDuration(callDuration)}</p>*/

      {/* Video Section */}
     /* <div className="grid grid-cols-2 gap-4 w-full max-w-6xl">*/
        {/* Local Video */}
      /*  <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-600 mb-2">{user.name || "You"}</p>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-auto bg-gray-800 rounded-lg shadow-md"
          />
        </div>*/
        {/* Remote Video */}
      /*  <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-600 mb-2">Remote User</p>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-auto bg-gray-800 rounded-lg shadow-md"
          />
        </div>
      </div>*/

      {/* Controls Section */}
    /*  <div className="flex space-x-4 mt-6">
        <button
          onClick={toggleMute}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isMuted ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={toggleCamera}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isCameraOn ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          } text-white`}
        >
          {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        <button
          onClick={toggleScreenShare}
          disabled={!callInitialized}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isScreenSharing ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
        <button
          onClick={onEndCall}
          className="py-3 px-6 rounded-lg shadow-md bg-red-500 hover:bg-red-600 text-white focus:outline-none transition"
        >
          End Call
        </button>
        <button
          onClick={() => setIsWhiteboardVisible((prev) => !prev)}
          className="py-3 px-6 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 text-white focus:outline-none transition"
        >
          {isWhiteboardVisible ? "Hide Whiteboard" : "Show Whiteboard"}
        </button>
      </div>
*/
      {/* Whiteboard Section */}
     /* {isWhiteboardVisible && (
        <div className="flex flex-col items-center justify-center mt-6 w-full max-w-4xl">
          <p className="text-gray-600 text-sm mb-2">Interactive Whiteboard</p>
          <canvas
            ref={canvasRef}
            className="w-full h-96 border border-gray-300 bg-white shadow-md"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          />
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
              }}
              className="py-3 px-6 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 text-white focus:outline-none transition"
            >
              Clear Whiteboard
            </button>
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) {
                  const image = canvas.toDataURL("image/png");
                  const link = document.createElement("a");
                  link.href = image;
                  link.download = "whiteboard.png"; // File name
                  link.click(); // Trigger the download
                }
              }}
              className="py-3 px-6 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none transition"
            >
              Export Canvas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;*/





/*import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend signaling server URL

const VideoCall = ({ user, onEndCall }) => {
  const localVideoRef = useRef(null); // Reference for the local video element
  const remoteVideoRef = useRef(null); // Reference for the remote video element
  const [callDuration, setCallDuration] = useState(0); // State for the call timer
  const [isScreenSharing, setIsScreenSharing] = useState(false); // State for screen sharing
  const [callInitialized, setCallInitialized] = useState(false); // State to track if the call is initialized
  const [isMuted, setIsMuted] = useState(false); // State for muting/unmuting audio
  const [isCameraOn, setIsCameraOn] = useState(true); // State for toggling the camera
  const peerConnection = useRef(null); // Persist peer connection across re-renders
  const localStream = useRef(null); // Persist local stream across re-renders

  // Initialize the call
  useEffect(() => {
    const initializeCall = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        if (videoDevices.length === 0) throw new Error("No video devices found.");

        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: videoDevices[0]?.deviceId ? { exact: videoDevices[0].deviceId } : undefined },
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream.current;
        }

        peerConnection.current = new RTCPeerConnection();

        localStream.current.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, localStream.current);
        });

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, to: user.socketId });
          }
        };

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { offer, to: user.socketId });

        setCallInitialized(true); // Mark call as initialized
      } catch (error) {
        console.error("Error initializing video call:", error);
        alert(error.message || "An unexpected error occurred while initializing the video call.");
      }
    };

    initializeCall();

    const timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);

    return () => {
      clearInterval(timer);
      if (peerConnection.current) peerConnection.current.close();
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [user.socketId]);

  // Format the call duration (seconds to MM:SS)
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Toggle mute/unmute audio
  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  // Start or stop screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!peerConnection.current) {
        throw new Error("Peer connection is not initialized. Please wait for the call to connect.");
      }

      if (isScreenSharing) {
        stopScreenShare();
      } else {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        peerConnection.current.getSenders().forEach((sender) => {
          if (sender.track.kind === "video") {
            sender.replaceTrack(screenTrack);
          }
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenTrack.onended = stopScreenShare;
        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("Error toggling screen sharing:", error);
      alert(error.message || "Unable to toggle screen sharing.");
    }
  };

  const stopScreenShare = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];

      peerConnection.current.getSenders().forEach((sender) => {
        if (sender.track.kind === "video") {
          sender.replaceTrack(videoTrack);
        }
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
    }

    setIsScreenSharing(false);
  };
*/
  /*return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">*/
      {/* Call Timer */}
    /*  <p className="text-gray-600 text-sm mb-4">Call Duration: {formatDuration(callDuration)}</p>

      <div className="relative flex justify-center items-center w-full max-w-4xl p-4 bg-white rounded-lg shadow-xl">*/
        {/* Video Section */}
       /* <div className="grid grid-cols-2 gap-4 w-full">*/
          {/* Local Video */}
        /*  <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-600 mb-2">{user.name || "You"}</p>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-auto bg-gray-800 rounded-lg shadow-md border border-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">{isCameraOn ? "Camera On" : "Camera Off"}</p>
          </div>*/
          {/* Remote Video */}
         /*<div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-600 mb-2">Remote User</p>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto bg-gray-800 rounded-lg shadow-md border border-gray-300"
            />
          </div>
        </div>
      </div>*/

      {/* Controls Section */}
      /*<div className="flex space-x-4 mt-6">
        <button
          onClick={toggleMute}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isMuted ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={toggleCamera}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isCameraOn ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          } text-white`}
        >
          {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        <button
          onClick={toggleScreenShare}
          disabled={!callInitialized}
          className={`py-3 px-6 rounded-lg shadow-md focus:outline-none transition ${
            isScreenSharing ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
        <button
          onClick={onEndCall}
          className="py-3 px-6 rounded-lg shadow-md bg-red-500 hover:bg-red-600 text-white focus:outline-none transition"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;*/
