import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend signaling server URL

const VideoCall = ({ user, onEndCall }) => {
  const localVideoRef = useRef(null); // Reference for the local video element
  const remoteVideoRef = useRef(null); // Reference for the remote video element
  let peerConnection = null; // RTCPeerConnection instance
  let localStream = null; // Local media stream

  useEffect(() => {
    const initializeCall = async () => {
      try {
        // Enumerate available devices and log them
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log("Available devices:", devices);

        // Ensure at least one video input (camera) is available
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        if (videoDevices.length === 0) {
          throw new Error("No video devices found. Please connect a camera.");
        } else {
          console.log("Selected video device:", videoDevices[0].label);
        }

        // Set constraints for video and audio
        const constraints = {
          video: { deviceId: videoDevices[0]?.deviceId ? { exact: videoDevices[0].deviceId } : undefined },
          audio: true,
        };

        // Capture the local media stream
        localStream = await navigator.mediaDevices.getUserMedia(constraints);

        // Log stream tracks for debugging
        localStream.getTracks().forEach((track) => {
          console.log(`Track kind: ${track.kind}, Track readyState: ${track.readyState}`);
        });

        // Attach the local stream to the video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
          console.log("Local stream successfully attached to the video element.");
        } else {
          console.error("Local video reference is null. Ensure the ref is correctly assigned.");
        }

        // Initialize RTCPeerConnection
        peerConnection = new RTCPeerConnection();

        // Add each track from the local stream to the peer connection
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, to: user.socketId });
          }
        };

        // Handle incoming remote stream
        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            console.log("Remote stream successfully attached to the video element.");
          } else {
            console.error("Remote video reference is null. Ensure the ref is correctly assigned.");
          }
        };

        // Create and send offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit("offer", { offer, to: user.socketId });
      } catch (error) {
        console.error("Error initializing video call:", error);

        // Enhanced error handling
        if (error.name === "NotAllowedError") {
          alert("Camera and microphone permissions are required. Please enable permissions in your browser and system settings.");
        } else if (error.name === "NotFoundError") {
          alert("No camera found. Please connect one.");
        } else if (error.name === "NotReadableError") {
          alert("Camera is currently in use by another application. Close other apps and try again.");
        } else if (error.message === "Starting videoinput failed") {
          alert("Unable to start video input. Please check your camera connection or system settings.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };

    initializeCall();

    // Handle incoming signaling events
    socket.on("answer", async ({ answer }) => {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", ({ candidate }) => {
      try {
        if (peerConnection) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });

    // Cleanup resources on unmount
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop()); // Stop all local media tracks
      }
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [user.socketId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative flex justify-center items-center w-full max-w-4xl p-4 bg-white rounded-lg shadow-xl">
        {/* Video Section */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Local Video */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-600 mb-2">Your Camera</p>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-auto bg-gray-800 rounded-lg shadow-md border border-gray-300"
            />
          </div>
          {/* Remote Video */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-600 mb-2">Remote Camera</p>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto bg-gray-800 rounded-lg shadow-md border border-gray-300"
            />
          </div>
        </div>
      </div>
      <button
        onClick={onEndCall} // Trigger parent handler to end call
        className="mt-6 bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition"
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCall;
