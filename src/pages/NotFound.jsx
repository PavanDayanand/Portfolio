import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-black text-skin-text-base/10">404</h1>
      <h2 className="text-3xl font-bold text-skin-text-base mt-4">
        Page Not Found
      </h2>
      <p className="text-skin-text-base/60 mt-2 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-skin-inverted text-skin-text-inverted rounded-full font-bold hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
