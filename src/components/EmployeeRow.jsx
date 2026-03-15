"use client";

import { useRouter } from "next/navigation";

export default function EmployeeRow({ employee, style }) {

  const router = useRouter();

  return (

    <div
      style={style}
      className="grid grid-cols-5 items-center border-2 h-[60px] px-3 text-black bg-white hover:bg-gray-50"
    >

      <div>{employee[0]}</div>

      <div className="text-sm text-gray-600">
        {employee[1]}
      </div>

      <div>{employee[2]}</div>

      <div>{employee[5]}</div>

      <button
        onClick={() => router.push(`/details/${employee[3]}`)}
        className="text-blue-600 hover:underline inline-block text-start ml-1.5"
      >
        View
      </button>

    </div>

  );
}