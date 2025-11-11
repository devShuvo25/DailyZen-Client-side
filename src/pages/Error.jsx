import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  color-text text-center p-6">
      <FaExclamationTriangle className="color-acent text-6xl mb-6 animate-bounce" />
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn my-btn text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
