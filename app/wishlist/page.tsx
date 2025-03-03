// pages/wishlist.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../sb-components/header1";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Loader2,
  Grid,
  List,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Simulate fetching wishlist data
  useEffect(() => {
    // In a real application, you would fetch from an API
    const fetchWishlist = async () => {
      // Simulating API delay
      setTimeout(() => {
        // Mock data
        const mockWishlist: Product[] = [
          {
            id: "1",
            name: "Organic Tomatoes",
            price: 3.99,
            imageUrl: "/picturesForCart/Red-capsicum.jpg",
            farmer: "Green Valley Farm",
            category: "Vegetables",
            available: true,
            description:
              "Locally grown, pesticide-free tomatoes perfect for salads and cooking. Harvested at peak ripeness for maximum flavor and nutrition.",
          },
          {
            id: "2",
            name: "Farm Fresh Eggs",
            price: 5.49,
            imageUrl: "/api/placeholder/300/300",
            farmer: "Sunrise Poultry",
            category: "Dairy & Eggs",
            available: true,
            description:
              "Free-range eggs from pasture-raised chickens. Dozen per carton. Rich in flavor with vibrant orange yolks.",
          },
          {
            id: "3",
            name: "Honey (16oz)",
            price: 8.99,
            imageUrl: "/api/placeholder/300/300",
            farmer: "Wildflower Apiary",
            category: "Specialty",
            available: false,
            description:
              "Raw, unfiltered wildflower honey collected from local hives. Pure, natural sweetness with floral notes.",
          },
          {
            id: "4",
            name: "Organic Apples",
            price: 4.99,
            imageUrl: "/picturesForCart/apple.jpg",
            farmer: "Orchard Hills",
            category: "Fruits",
            available: true,
            description:
              "Sweet and crisp apples grown using organic farming practices. Perfect for snacking, baking, or making fresh apple juice.",
          },
          {
            id: "5",
            name: "Farm Fresh Eggs",
            price: 5.49,
            imageUrl: "/picturesForCart/eggs.jpg",
            farmer: "Sunrise Poultry",
            category: "Dairy & Eggs",
            available: true,
            description:
              "Free-range eggs from pasture-raised chickens. Dozen per carton. Rich in flavor with vibrant orange yolks.",
          },
          {
            id: "6",
            name: "Honey (16oz)",
            price: 8.99,
            imageUrl: "/picturesForCart/honey.jpg",
            farmer: "Wildflower Apiary",
            category: "Specialty",
            available: false,
            description:
              "Raw, unfiltered wildflower honey collected from local hives. Pure, natural sweetness with floral notes.",
          },
          {
            id: "7",
            name: "Organic Apples",
            price: 4.99,
            imageUrl: "/picturesForCart/apple.jpg",
            farmer: "Orchard Hills",
            category: "Fruits",
            available: true,
            description:
              "Sweet and crisp apples grown using organic farming practices. Perfect for snacking, baking, or making fresh apple juice.",
          },
        ];

        setWishlistItems(mockWishlist);
        setIsLoading(false);
      }, 800);
    };

    fetchWishlist();
  }, []);

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
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  // Function to add to cart with animation feedback
  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product click when adding to cart
    e.preventDefault(); // Prevent default link behavior

    setAddedToCart(product.id);

    // Reset the animation state after 1.5 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 1500);

    // Your actual cart logic here
    console.log(`Added ${product.name} to cart`);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Grid view component
  const GridView = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {wishlistItems.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="block"
        >
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-full"
            variants={itemVariants}
            layout
            exit="exit"
            whileHover={{ y: -5 }}
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
              <motion.button
                onClick={(e) => removeFromWishlist(product.id, e)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
                aria-label="Remove from wishlist"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </motion.button>
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

                <motion.button
                  onClick={(e) => addToCart(product, e)}
                  disabled={!product.available}
                  className={`p-2 rounded-full flex items-center justify-center ${
                    product.available
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } z-10`}
                  aria-label="Add to cart"
                  whileHover={product.available ? { scale: 1.1 } : {}}
                  whileTap={product.available ? { scale: 0.9 } : {}}
                  initial={false}
                  animate={
                    addedToCart === product.id
                      ? {
                          scale: [1, 1.2, 1],
                          backgroundColor: ["#16a34a", "#16a34a", "#16a34a"],
                        }
                      : {}
                  }
                >
                  {addedToCart === product.id ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs font-medium whitespace-nowrap"
                    >
                      Added!
                    </motion.span>
                  ) : (
                    <ShoppingCart className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* View details indicator */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="bg-white bg-opacity-90 px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-lg">
                View Details
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );

  // List view component
  const ListView = () => (
    <motion.div
      className="flex flex-col space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {wishlistItems.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="block"
        >
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row cursor-pointer relative"
            variants={itemVariants}
            layout
            exit="exit"
            whileHover={{ y: -3 }}
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

                <motion.button
                  onClick={(e) => removeFromWishlist(product.id, e)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors flex-shrink-0 z-10"
                  aria-label="Remove from wishlist"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </motion.button>
              </div>

              <p className="text-sm text-gray-500 my-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-gray-900 text-lg">
                  ${product.price.toFixed(2)}
                </span>

                <div className="flex items-center space-x-3">
                  <motion.span
                    className="text-green-600 font-medium hidden md:inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ x: 3 }}
                  >
                    View Details →
                  </motion.span>

                  <motion.button
                    onClick={(e) => addToCart(product, e)}
                    disabled={!product.available}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 z-10 ${
                      product.available
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-label="Add to cart"
                    whileHover={product.available ? { scale: 1.03 } : {}}
                    whileTap={product.available ? { scale: 0.97 } : {}}
                    initial={false}
                    animate={
                      addedToCart === product.id
                        ? {
                            scale: [1, 1.05, 1],
                            backgroundColor: ["#16a34a", "#16a34a", "#16a34a"],
                          }
                        : {}
                    }
                  >
                    {addedToCart === product.id ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-medium"
                      >
                        Added to Cart!
                      </motion.span>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Wishlist
          </motion.h1>
          <motion.p
            className="mt-2 text-green-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Save your favorite farm-fresh products
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
          </motion.div>
        ) : wishlistItems.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Heart className="mx-auto h-20 w-20 text-green-300 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Browse our farm-fresh products and add your favorites to start
              building your perfect harvest basket.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Explore Products
              </Link>
            </motion.div>
          </motion.div>
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
                  <motion.button
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                      viewType === "grid"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                      viewType === "list"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </motion.button>
                </div>

                <Link
                  href="/products"
                  className="ml-4 text-green-600 hover:text-green-800 font-medium flex items-center gap-2 group"
                >
                  Continue shopping
                  <span className="transform transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewType === "grid" ? (
                <GridView key="grid" />
              ) : (
                <ListView key="list" />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
