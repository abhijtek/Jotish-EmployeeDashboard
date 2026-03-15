"use client";

import { useEffect, useState } from "react";

export default function AuditImage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("auditImage");
    setImage(stored);
  }, []);

  if (!image) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-gray-200">
        Audit Image
      </h2>

      <div className="border border-gray-600 p-2 w-fit">
        <img
          src={image}
          className="w-125"
        />
      </div>
    </div>
  );
}