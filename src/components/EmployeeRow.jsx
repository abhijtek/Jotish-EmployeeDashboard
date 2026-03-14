// since this is a single component idt a seperate folder was required. Just to show clean code seperation
// name === position === city === salary === action(for redirecting)
"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function EmployeeRow({employee, style}) {
    const router = useRouter();
  return (
    <div
      style={style}
      className="grid grid-cols-5 p-3 border-b items-center bg-white hover:bg-gray-50"
    >

      <div>{employee[0]}</div>

      <div className="text-sm text-gray-600">
        {employee[1]}
      </div>

      <div>{employee[2]}</div>

      <div>{employee[5]}</div>

      <button
        onClick={() => router.push(`/details/${employee[3]}`)}
        className="text-blue-600 hover:underline"
      >
        View
      </button>

    </div>
  )
}

export default EmployeeRow