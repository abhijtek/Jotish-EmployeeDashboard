"use client";

import { useRouter } from "next/navigation";

export default function EmployeeRow({ employee, style }) {

  const router = useRouter();

  return (

    <div
      style={style}
      className="grid grid-cols-5 items-center border-b border-gray-300 h-15 px-4 text-black bg-white hover:bg-gray-100"
    >

      <div className="font-medium">
        {employee[0]}
      </div>

      <div className="text-sm text-gray-600">
        {employee[1]}
      </div>

      <div className="text-gray-700">
        {employee[2]}
      </div>

      <div className="text-gray-700">
        {employee[5]}
      </div>

      <button
        onClick={() => router.push(`/details/${employee[3]}`)}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        View
      </button>

    </div>

  );
}