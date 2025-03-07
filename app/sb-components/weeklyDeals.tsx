"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Testing() {
  interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
  }
  const router = useRouter();
  const handleClick = (product: Product) => {
    router.push(`/testing_components/${product.id}`);
  };
  const sendToCatalogue = (product: Product) => {
    router.push(`/testing_components/catalogue`);
  };

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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Weekly Deals Section */}

      <div className="bg-gray-100 p-10 px-0">
        <h1 className="text-4xl font-bold ml-[199.5px] mb-5">Weekly Deals</h1>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide p-5 px-0 mb-1 scroll-smooth w-full mx-[199.5px]">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="min-w-[256px] min-h-[410px] shadow-lg p-0 cursor-pointer transition-transform hover:scale-[1.01] flex flex-col justify-between rounded-lg"
              onClick={() => handleClick(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[250px] border object-cover "
              />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            className="bg-[#00b207] text-white py-2 px-4 rounded-lg hover:bg-[#00b207] hover:scale-105 transition-all duration-200 "
            onClick={() => {
              console.log("View All Clicked");
              sendToCatalogue(products[0]);
            }}
          >
            View All
          </button>
        </div>
      </div>
    </>
  );
}
