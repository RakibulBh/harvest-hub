import React from "react";
import Image from "next/image";
import Link from "next/link";

function Categories() {
  const images = {
    categories: "/picturesForShop/categories.jpg",
    dried: "/picturesForShop/exotics.jpg",
    supplements: "/picturesForShop/eggs.jpg",
    bars: "/picturesForShop/breads.jpg",
    drinks: "/picturesForShop/orange_juice.jpg",
  };
  return (
    <div className="px-4 lg:px-[199.5px] mb-[50px] mt-[50px]">
      {/* second section */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Intro Box with Nuts */}
        <div className="relative overflow-hidden rounded-lg md:col-span-5">
          {/* Background Image covering entire container */}
          <div className="absolute inset-0">
            <Image
              src={images.categories}
              alt="Natural Nuts"
              fill
              className="object-cover"
            />
          </div>

          {/* Content overlay with semi-transparent background */}
          <div
            className="relative z-10 p-6 flex flex-col justify-between h-full"
            style={{ minHeight: "400px" }}
          >
            <div className=" rounded-lg inline-block">
              <h2 className="text-3xl font-black">
                IT'S YOUR
                <br />
                FIRST TIME?
              </h2>
              <p className="mt-2">Explore categories!</p>
            </div>

            <div className="mt-auto">
              <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold inline-block">
                NATURAL NUTS
              </span>
            </div>
          </div>

          {/* Clickable link overlay */}
          <Link href="#nuts">
            <span className="absolute inset-0 z-20"></span>
          </Link>
        </div>

        {/* Main content grid */}
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          {/* Dried Fruits and Supplements row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dried Fruits - Half width */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ minHeight: "280px" }}
            >
              <Image
                src={images.dried}
                alt="Dried Fruits"
                fill
                className="object-cover hover:scale-105 transition-duration-300"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
                  DRIED FRUITS
                </span>
              </div>
              <Link href="#dried">
                <span className="absolute inset-0"></span>
              </Link>
            </div>

            {/* Supplements - Half width */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ minHeight: "180px" }}
            >
              <Image
                src={images.supplements}
                alt="Supplements"
                fill
                className="object-cover hover:scale-105 transition-duration-300"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
                  SUPPLEMENTS
                </span>
              </div>
              <Link href="#supplements">
                <span className="absolute inset-0"></span>
              </Link>
            </div>
          </div>

          {/* Bars and Snacks - Full width */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ minHeight: "220px" }}
          >
            <Image
              src={images.bars}
              alt="Bars and Snacks"
              fill
              className="object-cover hover:scale-105 transition-duration-300"
            />
            <div className="absolute bottom-4 left-4">
              <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
                BARS AND SNACKS
              </span>
            </div>
            <Link href="#bars">
              <span className="absolute inset-0"></span>
            </Link>
          </div>
        </div>

        {/* Drinks - Full height */}
        <div
          className="relative rounded-lg overflow-hidden md:col-span-2 md:row-span-1"
          style={{ minHeight: "180px", height: "100%" }}
        >
          <Image
            src={images.drinks}
            alt="Drinks"
            fill
            className="object-cover hover:scale-105 transition-duration-300"
          />
          <div className="absolute bottom-4 left-4">
            <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
              DRINKS
            </span>
          </div>
          <Link href="#drinks">
            <span className="absolute inset-0"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
