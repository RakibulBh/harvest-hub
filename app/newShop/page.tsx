"use client";
import { useEffect, useState } from "react";
import Navbar from "../sb-components/header1";

export default function ProductsList() {
  interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    category: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/shop");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="mt-[130px]"></div>

      {/* Promotions Section */}
      <div>
        <div className="recommended-items flex gap-4 overflow-x-auto scrollbar-hide p-5 mb-1 scroll-smooth w-full ml-[150px] mr-[150px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[240px] min-h-[390px] shadow-lg p-0 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-between rounded-xl"
            >
              <img src={product.image} alt={product.name} width={100} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
