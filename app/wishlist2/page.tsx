// pages/wishlist.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../sb-components/header3";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Loader2,
  Grid,
  List,
  X,
} from "lucide-react";

// Define types for our products
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  farmer: string;
  category: string;
  available: boolean;
  description: string;
}

// Define view types
type ViewType = "grid" | "list";

const WishlistPage: React.FC = () => {
  // State to store wishlist items
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [removedItem, setRemovedItem] = useState<string | null>(null);

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

  // Load user preference for view type from localStorage (if available)
  useEffect(() => {
    const savedViewType = localStorage.getItem(
      "wishlistViewType"
    ) as ViewType | null;
    if (savedViewType) {
      setViewType(savedViewType);
    }
  }, []);

  // Save view type preference when it changes
  useEffect(() => {
    localStorage.setItem("wishlistViewType", viewType);
  }, [viewType]);

  // Function to remove item from wishlist
  const removeFromWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product click when removing
    e.preventDefault(); // Prevent default link behavior

    // Remove after animation completes
    setTimeout(() => {
      setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      setRemovedItem(null);
    }, 300);
  };

  // Function to add to cart with animation feedback
  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product click when adding to cart
    e.preventDefault(); // Prevent default link behavior

    setAddedToCart(product.id);

    // Your actual cart logic here
    console.log(`Added ${product.name} to cart`);
  };

  // Grid view component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 fade-in">
      {wishlistItems.map((product) => (
        <Link
          href={`/testing_components/${product.id}`}
          key={product.id}
          className="block"
        >
          <div
            className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-full hover-lift ${
              removedItem === product.id ? "scale-out" : "scale-in"
            }`}
          >
            <div className="relative h-56">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Availability badge */}
              {!product.available && (
                <div className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  Currently Unavailable
                </div>
              )}

              {/* Remove button */}
              <button
                onClick={(e) => removeFromWishlist(product.id, e)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors z-10 btn-scale"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center space-x-1 mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {product.category}
                </span>
                <span className="text-xs text-gray-500">
                  • {product.farmer}
                </span>
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">
                  ${product.price.toFixed(2)}
                </span>

                <button
                  onClick={(e) => addToCart(product, e)}
                  disabled={!product.available}
                  className={`p-2 rounded-full flex items-center justify-center btn-scale ${
                    product.available
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } z-10 ${addedToCart === product.id ? "added-to-cart" : ""}`}
                  aria-label="Add to cart"
                >
                  {addedToCart === product.id ? (
                    <span className="text-xs font-medium whitespace-nowrap fade-in">
                      Added!
                    </span>
                  ) : (
                    <ShoppingCart className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* View details indicator */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="bg-white bg-opacity-90 px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-lg">
                View Details
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  // List view component
  const ListView = () => (
    <div className="flex flex-col space-y-4 fade-in">
      {wishlistItems.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="block"
        >
          <div
            className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row cursor-pointer relative hover-lift ${
              removedItem === product.id ? "scale-out" : "scale-in"
            }`}
          >
            <div className="relative h-56 md:h-auto md:w-48 lg:w-64 flex-shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />

              {/* Availability badge */}
              {!product.available && (
                <div className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  Currently Unavailable
                </div>
              )}
            </div>

            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      • {product.farmer}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {product.name}
                  </h3>
                </div>

                <button
                  onClick={(e) => removeFromWishlist(product.id, e)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors flex-shrink-0 z-10 btn-scale"
                  aria-label="Remove from wishlist"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>

              <p className="text-sm text-gray-500 my-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-gray-900 text-lg">
                  ${product.price.toFixed(2)}
                </span>

                <div className="flex items-center space-x-3">
                  <span className="text-green-600 font-medium hidden md:inline-block hover-right">
                    View Details →
                  </span>

                  <button
                    onClick={(e) => addToCart(product, e)}
                    disabled={!product.available}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 z-10 btn-scale ${
                      product.available
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    } ${addedToCart === product.id ? "added-to-cart" : ""}`}
                    aria-label="Add to cart"
                  >
                    {addedToCart === product.id ? (
                      <span className="font-medium fade-in">
                        Added to Cart!
                      </span>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold fade-down">Your Wishlist</h1>
          <p className="mt-2 text-green-100 fade-in delay-200">
            Save your favorite farm-fresh products
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 fade-in">
            <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-16 fade-in scale-in">
            <div className="fade-in delay-200">
              <Heart className="mx-auto h-20 w-20 text-green-300 mb-4" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Browse our farm-fresh products and add your favorites to start
              building your perfect harvest basket.
            </p>
            <div className="btn-scale">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-gray-600 text-lg">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
              </p>

              {/* View toggle buttons */}
              <div className="flex items-center">
                <span className="text-gray-500 mr-3 text-sm">View:</span>
                <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
                  <button
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-md flex items-center justify-center transition-colors btn-scale ${
                      viewType === "grid"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    title="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-md flex items-center justify-center transition-colors btn-scale ${
                      viewType === "list"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <Link
                  href="/shop"
                  className="ml-4 text-green-600 hover:text-green-800 font-medium flex items-center gap-2 group"
                >
                  Continue shopping
                  <span className="transform transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="view-transition">
              {viewType === "list" ? (
                <ListView key="list" />
              ) : (
                <GridView key="grid" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
