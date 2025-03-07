"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../sb-components/header3";
import { Heart, ChevronDown } from "lucide-react";

export default function ProductListing() {
  interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    originalPrice: number;
    description: string;
    category: string;
    discount?: number;
    liked?: boolean;
    dietaryOptions?: string[];
    distance?: number;
    rating?: number;
  }

  const router = useRouter();
  const [likeError, setLikeError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState<
    string[]
  >([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxDistance, setMaxDistance] = useState(50);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/shop");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        // Add sample ratings if they don't exist
        const dataWithRatings = data.map((product: { rating: any }) => ({
          ...product,
          rating: product.rating || Math.random() * 4 + 1, // Random rating between 1 and 5
        }));
        setProducts(dataWithRatings);
        setFilteredProducts(dataWithRatings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [
    selectedCategories,
    selectedDietaryOptions,
    priceRange,
    maxDistance,
    sortOption,
  ]);

  const filterAndSortProducts = () => {
    let filtered = products.filter((product) => {
      const inCategory = selectedCategories.length
        ? selectedCategories.includes(product.category)
        : true;
      const inDietary = selectedDietaryOptions.length
        ? product.dietaryOptions?.some((opt) =>
            selectedDietaryOptions.includes(opt)
          )
        : true;
      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const inDistance = product.distance
        ? product.distance <= maxDistance
        : true;
      return inCategory && inDietary && inPriceRange && inDistance;
    });

    // Apply sorting
    switch (sortOption) {
      case "cheapest":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;
      case "relevant":
      default:
        // Most relevant could be a combination of factors like rating and proximity
        filtered = [...filtered].sort((a, b) => {
          const relevanceA = (a.rating || 0) - (a.distance || 50) / 100;
          const relevanceB = (b.rating || 0) - (b.distance || 50) / 100;
          return relevanceB - relevanceA;
        });
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCheckboxChange = (
    value: string,
    setState: Function,
    state: string[]
  ) => {
    setState(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
    );
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case "cheapest":
        return "Price: Low to High";
      case "expensive":
        return "Price: High to Low";
      case "rating":
        return "Highest Rated";
      case "relevant":
        return "Most Relevant";
      default:
        return "Sort By";
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-lg text-gray-600">Loading...</p>
    );

  return (
    <>
      <Navbar />

      {/* Sorting Dropdown */}
      <div className="container mx-auto px-6 py-4 flex justify-end">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              {getSortLabel()}
              <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </div>

          {showSortDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => handleSortChange("relevant")}
                  className={`${
                    sortOption === "relevant" ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                  role="menuitem"
                >
                  Most Relevant
                </button>
                <button
                  onClick={() => handleSortChange("cheapest")}
                  className={`${
                    sortOption === "cheapest" ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                  role="menuitem"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange("expensive")}
                  className={`${
                    sortOption === "expensive" ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                  role="menuitem"
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handleSortChange("rating")}
                  className={`${
                    sortOption === "rating" ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                  role="menuitem"
                >
                  Highest Rated
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 flex gap-8 py-4">
        {/* Sidebar Filters */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Filters</h3>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-600 mb-2">Categories</h4>
            {["Fruits", "Vegetables", "Dairy", "Bakery", "Meats & Seafood"].map(
              (category) => (
                <label key={category} className="block mb-2 text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2 accent-green-600"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      handleCheckboxChange(
                        category,
                        setSelectedCategories,
                        selectedCategories
                      )
                    }
                  />
                  {category}
                </label>
              )
            )}
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-600 mb-2">
              Dietary Options
            </h4>
            {["Vegan", "Vegetarian", "Gluten-Free", "Organic"].map((option) => (
              <label key={option} className="block mb-2 text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 accent-green-600"
                  checked={selectedDietaryOptions.includes(option)}
                  onChange={() =>
                    handleCheckboxChange(
                      option,
                      setSelectedDietaryOptions,
                      selectedDietaryOptions
                    )
                  }
                />
                {option}
              </label>
            ))}
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-600 mb-2">
              Price Range (£{priceRange[0]} - £{priceRange[1]})
            </h4>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-green-600"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">
              Max Distance (km): {maxDistance}
            </h4>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-3/4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white h-80"
              >
                <div className="h-48 w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 h-32 flex flex-col">
                  <h3 className="font-semibold text-gray-700 text-sm mb-2 line-clamp-2 h-12">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-green-600 font-bold">
                      £{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-400 text-sm line-through">
                        £{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Star Rating (without numeric display) */}
                  <div className="flex mt-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(product.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No products match your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedDietaryOptions([]);
                  setPriceRange([0, 100]);
                  setMaxDistance(50);
                }}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
