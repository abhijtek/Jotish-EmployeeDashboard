"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "./SignatureCanvas";

export default function CameraCapture({ employeeId }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [cameraOn,setCameraOn] = useState(false) 
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (error) {
      alert("Camera access denied or unavailable");

      console.error("Camera error:", error);
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setPhoto(image);
  }
  const reCapturePhoto = ()=>{
    setPhoto(null);
    setCameraOn(false);
  }
  return (
    <div className="space-y-4">
      {!photo && (
        <>
          <video ref={videoRef} autoPlay className="border w-[500px]" />

          <div className="space-x-3">
            {!cameraOn && <button
              onClick={startCamera}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Start Camera
            </button>}

            <button
              onClick={capturePhoto}
              className="bg-green-500 text-white px-4 py-2"
            >
              Capture
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </>
      )}

      {photo && <SignatureCanvas photo={photo} employeeId={employeeId} />}
      {photo &&             <button
              onClick={reCapturePhoto}
              className="bg-green-500 text-white px-4 py-2"
            >
              Retake
            </button>}
    </div>
  );
}
