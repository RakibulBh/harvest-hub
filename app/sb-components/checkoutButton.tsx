"use client";
import { useState, useEffect } from 'react';

const CheckoutButton: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleCheckout = () => {
    setIsAnimating(true);
    // You would typically handle actual checkout logic here
    // For example, redirect to payment page after animation completes
    setTimeout(() => {
      console.log('Checkout complete!');
      // Reset animation state after animation completes if needed
      // setIsAnimating(false);
    }, 3000);
  };

  // Animation frames for van movement
  useEffect(() => {
    if (isAnimating) {
      let startTime: number;
      let animationFrameId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / 3000, 1); // 3 seconds animation
        
        // Move van to the right
        setPosition(progress * 300);
        
        // Rotate wheels
        setRotation(prev => (prev + 10) % 360);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isAnimating]);

  return (
    <div className="relative w-48 h-12 mx-auto my-5">
      {/* Checkout Button */}
      <button 
        className={`w-full h-full bg-green-500 hover:bg-green-600 text-white font-bold rounded transition-all duration-300 ease-in-out hover:scale-102 ${isAnimating ? 'opacity-0 pointer-events-none' : ''}`}
        onClick={handleCheckout}
        disabled={isAnimating}
      >
        Checkout
      </button>
      
      {/* Animation Container */}
      {isAnimating && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Road */}
          <div className="absolute bottom-2 w-full h-0.5 bg-gray-800"></div>
          
          {/* Van */}
          <div 
            className="absolute bottom-2.5 left-0 w-14 h-8" 
            style={{ transform: `translateX(${position}px)` }}
          >
            {/* Van Body */}
            <div className="absolute bottom-0 w-10 h-5 bg-blue-500 rounded"></div>
            
            {/* Van Cabin */}
            <div className="absolute bottom-0 left-10 w-4 h-4 bg-blue-700 rounded-tr-md rounded-br"></div>
            
            {/* Wheels */}
            <div 
              className="absolute w-2 h-2 bg-gray-800 rounded-full bottom-[-4px] left-2"
              style={{ transform: `rotate(${rotation}deg)` }}
            ></div>
            <div 
              className="absolute w-2 h-2 bg-gray-800 rounded-full bottom-[-4px] left-9"
              style={{ transform: `rotate(${rotation}deg)` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;