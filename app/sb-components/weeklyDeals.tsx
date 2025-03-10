"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WeeklyDeals() {
  interface Product {
    id: number;
    farm_id: number;
    promotion_id: number;
    name: string;
    image: string;
    price: number;
    unit: string;
    description: string;
    category: string;
    stock: number;
    harvest_date: Date;
    best_before: Date;
    liked: boolean;
    discount: number;
    discount_start: Date;
    discount_end: Date;
  }
  const router = useRouter();
  const handleClick = (product: Product) => {
    router.push(`/testing_components/${product.id}`);
  };
  const sendToCatalogue = (product: Product) => {
    router.push(`/testing_components/catalogue`);
  };

  // API call to fetch products
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/weeklyDeals/");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setDeals(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Weekly Deals Section */}

      <div className="bg-gray-100 p-10 px-0">
        <h1 className="text-4xl font-bold ml-[199.5px] mb-5">Weekly Deals</h1>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide p-5 px-0 mb-1 scroll-smooth w-full mx-[199.5px]">
          {deals.map((deal) => (
            <div key={deal.promotion_id}>
              <h2>{deal.name}</h2>
              <p>Price: ${deal.price}</p>

              <p>
                🔥 {deal.discount}% OFF! (Valid till{" "}
                {deal.discount_end.toDateString()})
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            className="bg-[#00b207] text-white py-2 px-4 rounded-lg hover:bg-[#00b207] hover:scale-105 transition-all duration-200 "
            onClick={() => {
              console.log("View All Clicked");
              sendToCatalogue(deals[0]);
            }}
          >
            View All
          </button>
        </div>
      </div>
    </>
  );
}
