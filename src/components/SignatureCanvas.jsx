"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignatureCanvas({ photo, employeeId }) {
 
    function getPosition(e) {

  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }

  return {
    x: e.nativeEvent.offsetX,
    y: e.nativeEvent.offsetY
  };

}
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

  e.preventDefault();

  setDrawing(true);

  const ctx = canvasRef.current.getContext("2d");

  const pos = getPosition(e);

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);

}

function draw(e) {

  if (!drawing) return;

  e.preventDefault();

  const ctx = canvasRef.current.getContext("2d");

  const pos = getPosition(e);

  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

}

  function stopDraw() {

    setDrawing(false);

  }

function saveImage() {

  const canvas = canvasRef.current;

  const base64 = canvas.toDataURL("image/png");

  localStorage.setItem("auditImage", base64);

  router.push("/analytics");

}


  return (
    <div>

      <p className="mb-2">Sign below:</p>
 {/* touch none prevent accidental scrolling */}
<canvas
  ref={canvasRef}
  className="border touch-none"

  onMouseDown={startDraw}
  onMouseMove={draw}
  onMouseUp={stopDraw}
  onMouseLeave={stopDraw}

  onTouchStart={startDraw}
  onTouchMove={draw}
  onTouchEnd={stopDraw}
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