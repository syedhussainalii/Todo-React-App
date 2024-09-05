import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="logo">
        <span className="font-bold text-2xl mx-9">iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-300">
          Home
        </li>
        <li className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-300">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
}

