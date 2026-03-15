"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "./SignatureCanvas";

export default function CameraCapture({ employeeId }) {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  function reCapturePhoto() {
    setPhoto(null);
    setCameraOn(false);
  }

  return (
    <div className="flex flex-col items-center gap-4">

      {!photo && (
        <>
          <video
            ref={videoRef}
            autoPlay
            className="border border-gray-600 w-125"
          />

          <div className="flex gap-3">
            {!cameraOn && (
              <button
                onClick={startCamera}
                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
              >
                Start Camera
              </button>
            )}

            <button
              onClick={capturePhoto}
              className="bg-green-600 text-white px-4 py-2 hover:bg-green-700"
            >
              Capture
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </>
      )}

      {photo && (
        <>
          <SignatureCanvas photo={photo} employeeId={employeeId} />

          <div className="flex gap-4">
            <button
              onClick={reCapturePhoto}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              Retake
            </button>
          </div>
        </>
      )}

    </div>
  );
}