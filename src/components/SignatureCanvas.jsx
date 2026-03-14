"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignatureCanvas({ photo, employeeId }) {

  const canvasRef = useRef(null);
  const router = useRouter();

  const [drawing, setDrawing] = useState(false);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.src = photo;

    img.onload = () => {

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

    };

  }, [photo]);

  function startDraw(e) {

    setDrawing(true);

    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

  }

  function draw(e) {

    if (!drawing) return;

    const ctx = canvasRef.current.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

  }

  function stopDraw() {

    setDrawing(false);

  }

  function saveImage() {

    const finalImage = canvasRef.current.toDataURL("image/png");

    localStorage.setItem("auditImage", finalImage);

    router.push("/analytics");

  }

  return (
    <div>

      <p className="mb-2">Sign below:</p>

      <canvas
        ref={canvasRef}
        className="border"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
      />

      <button
        onClick={saveImage}
        className="mt-4 bg-purple-600 text-white px-4 py-2"
      >
        Save Signature
      </button>

    </div>
  );
}