"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import Navbar from "../sb-components/header3";
import { HeroImage } from "../sb-components/HeroImage3";
import Categories from "../sb-components/categories";
import SubscriptionCard from "../sb-components/subscription";
import Footer from "../sb-components/footer";
import CategorySelector from "../sb-components/second-nav";
import WeeklyDeals from "../sb-components/weeklyDeals";

export default function Testing() {
  interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
  }

  // API call to fetch products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/shop");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return;
  <p className="text-center py-20 text-lg">Loading products...</p>;

  function toggleLike(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Navbar />
      <HeroImage />
      <CategorySelector />
      <WeeklyDeals />

      <Categories />

      <div className="h-[500px] w-full bg-gray-100 items-center justify-center flex text-5xl font-bold mb-[50px]">
        Raccomended For You
      </div>

      <div className="h-[500px] w-full bg-gray-100 items-center justify-center flex text-5xl font-bold mb-[50px]">
        Featured
      </div>

      <SubscriptionCard />
      <Footer />
    </>
  );
}
