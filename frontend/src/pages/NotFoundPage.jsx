import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-center px-6">
      {/* Illustration */}
      <img
        src="../../public/404Page.png"
        alt="404 illustration"
        className="w-60"
      />

      {/* Big 404 Text */}
      <h1 className="text-6xl font-extrabold text-indigo-600 drop-shadow-md">
        404
      </h1>

      {/* Subheading */}
      <h2 className="mt-2 text-2xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved. But don’t
        worry, let’s get you back on track!
      </p>

      {/* CTA Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-400 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
