"use client";
import { useEffect, useState } from "react";

// components
import Navbar from "../sb-components/header3";
import { HeroImage } from "../sb-components/HeroImage3";
import Categories from "../sb-components/categories";
import SubscriptionCard from "../sb-components/subscription";
import Footer from "../sb-components/footer";
import CategorySelector from "../sb-components/second-nav";

export default function Testing() {
  return (
    <>
      <Navbar />
      <HeroImage />
      <CategorySelector />

      <div className="h-[500px] w-full bg-gray-100 items-center justify-center flex text-5xl font-bold">
        Weekly Deals
      </div>

      <Categories />

      <div className="h-[500px] w-full bg-gray-100 items-center justify-center flex text-5xl font-bold">
        Raccomended For You
      </div>

      <div className="h-[500px] w-full bg-gray-100 items-center justify-center flex text-5xl font-bold mt-[50px] mb-[50px]">
        Trending
      </div>

      <SubscriptionCard />
      <Footer />
    </>
  );
}
