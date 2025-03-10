"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../sb-components/header3";
import {
  Heart,
  ChevronDown,
  ArrowLeft,
  ShoppingCart,
  Grid,
  List,
  Save,
  Check,
  Trash2,
  Search,
  Plus,
  Minus,
} from "lucide-react";

export default function LikedProducts() {
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
    unit: string;
    quantity: number; // Added quantity field
  }

  const router = useRouter();
  const [likeError, setLikeError] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("relevant");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  useEffect(() => {
    async function fetchLikedProducts() {
      try {
        // Fetch all products first
        const res = await fetch("/api/shop");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();

        // Filter to only liked products
        const likedProductsData = data.filter(
          (product: { liked: boolean }) => product.liked === true
        );

        // Add sample ratings if they don't exist and initialize quantity
        const dataWithRatings = likedProductsData.map(
          (product: { rating: any; quantity?: number }) => ({
            ...product,
            rating: product.rating || Math.random() * 4 + 1, // Random rating between 1 and 5
            quantity: product.quantity || 1, // Initialize quantity
          })
        );

        setLikedProducts(dataWithRatings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchLikedProducts();
  }, []);

  // Toggle product selection
  const toggleProductSelection = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation(); // Prevent navigation to product detail

    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // If already selected, remove from selection
        return prevSelected.filter((id) => id !== productId);
      } else {
        // If not selected, add to selection
        return [...prevSelected, productId];
      }
    });
  };

  // Function to save changes (remove selected products)
  const saveChanges = () => {
    try {
      if (selectedProducts.length === 0) {
        return; // Nothing to remove
      }

      // Remove selected products from liked products
      setLikedProducts((prevProducts) => {
        return prevProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        );
      });

      // Clear selection
      setSelectedProducts([]);
      setLikeError(null);

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error saving changes:", error);
      setLikeError("Failed to update wishlist. Please try again.");
    }
  };

  // Update product quantity
  const updateQuantity = (
    e: React.MouseEvent,
    productId: number,
    change: number
  ) => {
    e.stopPropagation(); // Prevent navigation to product detail

    setLikedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          const newQuantity = Math.max(1, product.quantity + change); // Ensure minimum quantity of 1
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
  };

  const addToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation(); // Prevent navigation to product detail

    // Find the product and its quantity
    const product = likedProducts.find((p) => p.id === productId);
    if (!product) return;

    // Here you would implement the add to cart functionality with quantity
    console.log(`Added ${product.quantity} of product ${productId} to cart`);
    // You could show a confirmation toast here
  };

  const navigateToProduct = (productId: number) => {
    router.push(`/testing_components/${productId}`);
  };

  const navigateBack = () => {
    router.back();
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setShowSortDropdown(false);

    // Sort the liked products based on the selected option
    let sorted = [...likedProducts];
    switch (option) {
      case "cheapest":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "relevant":
      default:
        sorted.sort((a, b) => {
          const relevanceA = (a.rating || 0) - (a.distance || 50) / 100;
          const relevanceB = (b.rating || 0) - (b.distance || 50) / 100;
          return relevanceB - relevanceA;
        });
        break;
    }
    setLikedProducts(sorted);
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

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  // Filter products based on search query
  const filteredProducts = likedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div>
        <Navbar />
        <p className="text-center py-20 text-lg text-gray-600">Loading...</p>
      </div>
    );

  // Render the star rating
  const renderStarRating = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${
            star <= Math.round(rating || 0)
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
  );

  // Render a grid view item
  const renderGridItem = (product: Product) => (
    <div
      key={product.id}
      className="rounded-lg overflow-hidden hover:shadow-xl transition-shadow hover:shadow-slate-100 duration-300 bg-white flex flex-col relative "
      style={{ width: "100%", maxWidth: "360px" }} // Fixed width to prevent overlap
    >
      {/* Like/Select button - now toggles selection */}
      <button
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        onClick={(e) => toggleProductSelection(e, product.id)}
      >
        {selectedProducts.includes(product.id) ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
        )}
      </button>

      {/* Add to Cart button - circular icon */}
      <button
        className="absolute bottom-2 right-2 z-10 p-3 bg-green-600 rounded-full shadow-md hover:bg-green-700 transition-colors text-white"
        onClick={(e) => addToCart(e, product.id)}
      >
        <ShoppingCart className="h-5 w-5" />
      </button>

      {/* Square image container */}
      <div
        className="w-full aspect-square cursor-pointer"
        onClick={() => navigateToProduct(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description below image */}
      <div
        className="p-4 flex flex-col flex-grow cursor-pointer"
        onClick={() => navigateToProduct(product.id)}
      >
        <h3 className="font-semibold text-gray-700 text-md mb-3 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-600 font-bold text-2xl">
            £{product.price}
          </span>
          <span className="text-sm text-gray-500">per {product.unit}</span>
        </div>
        {product.originalPrice > product.price && (
          <span className="text-gray-400 text-sm line-through mb-2">
            £{product.originalPrice}
          </span>
        )}

        {/* Quantity selector */}
        <div className="flex items-center mt-2 mb-3">
          <span className="text-sm text-gray-600 "></span>
          <div className="flex items-center border rounded-md">
            <button
              onClick={(e) => updateQuantity(e, product.id, -1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 py-1 min-w-6 text-center">
              {product.quantity}
            </span>
            <button
              onClick={(e) => updateQuantity(e, product.id, 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mt-auto">{renderStarRating(product.rating || 0)}</div>
      </div>
    </div>
  );

  // Render a list view item
  const renderListItem = (product: Product) => (
    <div
      key={product.id}
      className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white flex flex-row h-40 relative mb-5 w-full"
    >
      {/* Like/Select button - now toggles selection */}
      <button
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        onClick={(e) => toggleProductSelection(e, product.id)}
      >
        {selectedProducts.includes(product.id) ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
        )}
      </button>

      {/* Add to Cart button - circular icon */}
      <button
        className="absolute bottom-2 right-2 z-10 p-3 bg-green-600 rounded-full shadow-md hover:bg-green-700 transition-colors text-white"
        onClick={(e) => addToCart(e, product.id)}
      >
        <ShoppingCart className="h-5 w-5" />
      </button>

      {/* Square image container */}
      <div
        className="h-full aspect-square cursor-pointer"
        onClick={() => navigateToProduct(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description beside image */}
      <div
        className="p-4 flex flex-col flex-grow cursor-pointer"
        onClick={() => navigateToProduct(product.id)}
      >
        <h3 className="font-semibold text-gray-700 text-lg mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-green-600 font-bold text-lg">
            £{product.price}
          </span>
          <span className="text-sm text-gray-500">per {product.unit}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-sm line-through">
              £{product.originalPrice}
            </span>
          )}
        </div>

        {/* Quantity selector */}
        <div className="flex items-center mt-1 mb-2">
          <span className="text-sm text-gray-600 mr-2">Qty:</span>
          <div className="flex items-center border rounded-md">
            <button
              onClick={(e) => updateQuantity(e, product.id, -1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 py-1 min-w-6 text-center">
              {product.quantity}
            </span>
            <button
              onClick={(e) => updateQuantity(e, product.id, 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mt-auto">{renderStarRating(product.rating || 0)}</div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Success message */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-5 rounded flex items-center shadow-lg">
          <Check className="h-5 w-8 mr-2" />
          Changes saved successfully!
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Your Wishlist</h1>
          <p className="mt-2 text-green-100">
            Save your favorite farm-fresh products
          </p>
        </div>
      </div>

      {/* Error message for like functionality */}
      {likeError && (
        <div className="bg-red-100 text-red-700 p-3 text-center">
          {likeError}
        </div>
      )}

      <div className="container mx-auto px-6 py-4">
        <button
          onClick={navigateBack}
          className="flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </button>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Search your wishlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Liked Products
            <br className=" " />
            <p className="text-lg text-gray-400 mt-5 font-normal ">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"} in your
              wishlist
              {selectedProducts.length > 0 && (
                <span className="ml-2 text-green-600">
                  ({selectedProducts.length} selected)
                </span>
              )}
            </p>
          </h1>

          <div className="flex items-center gap-4">
            {/* Save Changes Button - only visible when products are selected */}
            {selectedProducts.length > 0 && (
              <button
                onClick={saveChanges}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Remove Selected ({selectedProducts.length})
              </button>
            )}

            {/* View Toggle */}
            <div className="border rounded-md flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-600"
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-600"
                }`}
                aria-label="List view"
                title="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Sorting Dropdown */}
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
        </div>

        {filteredProducts.length > 0 ? (
          viewMode === "grid" ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              style={{ gap: "20px" }}
            >
              {filteredProducts.map((product) => renderGridItem(product))}
            </div>
          ) : (
            <div className="flex flex-col gap-5" style={{ gap: "20px" }}>
              {filteredProducts.map((product) => renderListItem(product))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center">
              <Heart className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-gray-700 mb-2">
                {searchQuery
                  ? "No matching products found"
                  : "No favourites yet"}
              </h2>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "You haven't liked any products yet"}
              </p>
              <button
                onClick={() => router.push("/shop")}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Browse Products
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
