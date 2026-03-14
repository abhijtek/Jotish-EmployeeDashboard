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
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Audit Image
      </h2>

      <img
        src={image}
        className="border w-[500px]"
      />

    </div>
  );
}
