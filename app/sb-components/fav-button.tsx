"use client";
import React, { useState } from "react";

const AddToWishlistButton = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    setShowNotification(true);
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="relative flex items-center justify-center bg-gray-100">
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add to Wishlist
      </button>

      {/* Success Notification */}
      <div
        className={`fixed bottom-4 left-4 bg-green-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-4 transition-all duration-500 ease-out transform ${
          showNotification
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
        style={{ maxWidth: "380px", zIndex: 50 }}
      >
        {/* Notification Content */}
        <div className="flex-1">
          <p className="font-medium text-white mb-1">Item added to wishlist!</p>
          <p className="text-green-100 text-sm mb-2">
            Your item has been added to your wishlist successfully.
          </p>
          <a
            href="/wishlist"
            className="inline-block text-sm font-medium text-white underline hover:text-green-100 transition-colors duration-300"
          >
            See wishlist &rarr;
          </a>
        </div>

        {/* Large Animated Checkmark */}
        <div className="relative flex-shrink-0 w-16 h-16 ml-2">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
              showNotification ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <svg
              className={`w-16 h-16 transition-transform duration-700 ease-out ${
                showNotification ? "rotate-0" : "-rotate-180"
              }`}
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Inner circle */}
              <circle cx="48" cy="48" r="36" fill="white" fillOpacity="0.2" />

              {/* Checkmark */}
              <path
                d="M32 48L44 60L64 36"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset={showNotification ? "0" : "60"}
                style={{
                  transition: "stroke-dashoffset 0.8s ease-in-out 0.4s",
                }}
              />
            </svg>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowNotification(false)}
          className="absolute top-2 right-2 text-green-100 hover:text-white transition-colors duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddToWishlistButton;
