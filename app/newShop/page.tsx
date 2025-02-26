"use client";
import { useEffect, useState } from "react";
import { Header } from "../components/Farmer-Header";
import Navbar from "../components/homeNavbar";
import { HeroImage } from "../components/Sb-HeroImage";

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
      <HeroImage />

      {/* Filter & Search Section */}
      <div className="flex items-center space-x-4 ml-[150px]">
        {/* Category filter Section */}
        <div className="category-filter p-5 w-[250px]">
          <select
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-xl w-[200px]"
          >
            <option value="All">All categories</option>
            <option value="fruits & veg">Fruits & Veg</option>
            <option value="meat">Meat</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="herbs">Herbs & Spices</option>
            <option value="grains & crops">Grains & Crops</option>
            <option value="artisinal">Artisinal</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-bar p-5 w-[300px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products... "
            className="mt-2 p-2 border border-gray-300 rounded-xl w-full"
          />
        </div>
      </div>

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
