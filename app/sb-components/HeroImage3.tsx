import React from "react";

export const HeroImage: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 md:px-7">
      <div
        // Hero Image container
        className="relative rounded-lg sm:rounded-xl md:rounded-2xl bg-cover bg-center bg-no-repeat h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[680px] w-full shadow-md sm:shadow-lg my-3 sm:my-5 md:my-7"
        style={{ backgroundImage: "url('/picturesForShop/hero8.jpg')" }}
      >
        {/* Semi-transparent overlay for better text readability on any background */}
        <div className="absolute inset-0 bg-black bg-opacity-20 sm:bg-opacity-10 rounded-lg sm:rounded-xl md:rounded-2xl"></div>

        {/* Heading text container - responsive padding and width */}
        <div className="relative z-10 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 md:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-2 sm:mb-3 md:mb-4 mt-6 sm:mt-10 md:mt-16 lg:mt-20 ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20">
            Welcome to the best shop
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black mt-3 sm:mt-5 md:mt-8 lg:mt-10 ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20">
            We have all you need
          </p>
        </div>
      </div>
    </div>
  );
};
