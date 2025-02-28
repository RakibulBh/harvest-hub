"use client";
import React, { useState } from "react";
import { useRef } from "react";
import { Header } from "../components/Sb-Header";

import { HeroImage } from "../components/Sb-HeroImage";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";

type ShopItem = {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  quantity: number;
  category: string;
  image: string;
  description: string;
  farmId: number;
  farmName: string;
  farmAddress: string;
  lat: number; // Store latitude
  lng: number; // Store longitude
  rating: number;
  liked?: boolean; // Add liked property
};

export const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const closeModal = () => {
    setSelectedItem(null);
  };

  const recommendedScrollRef = useRef<HTMLDivElement | null>(null);
  const featuredScrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    offset: number
  ) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const maxStars = 5;
    return (
      <div className="flex">
        {[...Array(maxStars)].map((_, id) => (
          <span
            key={id}
            className={
              id < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: 1,
      name: "Green Capsicum",
      price: 14.0,
      discountPrice: 7,
      quantity: 5,
      category: "fruits & veg",
      image: "/picturesForCart/gc.jpg",
      description: "Fresh green",
      farmAddress: "Manor Farm, Blanket St, Alton GU34 3BD",
      farmId: 1,
      farmName: "Manor Farm",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Red Capsicum",
      price: 14.0,
      discountPrice: 7,
      quantity: 3,
      category: "fruits & veg",
      image: "/picturesForCart/Red-capsicum.jpg",
      description: "Fresh green",
      farmAddress: "The Ridgeway, London NW7 1QT",
      farmId: 2,
      farmName: "Belmont Farm",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 4,
    },
    {
      id: 3,
      name: "mixed grapes",
      price: 12.0,
      discountPrice: 7,
      quantity: 3,
      category: "fruits & veg",
      image: "/picturesForCart/mixedGrapes.jpg",
      description: "Fresh green",
      farmAddress:
        "Horsenden Farm, Horsenden Ln N, Horsenden, Greenford UB6 7PQ",
      farmId: 3,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 2,
    },
    {
      id: 4,
      name: "Chicken Breast",
      price: 20.0,
      discountPrice: 7,
      quantity: 5,
      category: "meat",
      image: "/picturesForCart/cb.jpg",
      description: "Fresh green",
      farmAddress: "Coursers Rd, St Albans AL4 0PF",
      farmId: 4,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 5,
    },
    {
      id: 5,
      name: "Beef Steak",
      price: 25.0,
      discountPrice: 7,
      quantity: 3,
      category: "meat",
      image: "/picturesForCart/beef.jpg",
      description: "Fresh green",
      farmAddress: "Manor Farm, Blanket St, Alton GU34 3BD",
      farmId: 5,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 3.8,
    },
    {
      id: 6,
      name: "Milk",
      price: 25.0,
      discountPrice: 7,
      quantity: 3,
      category: "dairy",
      image: "/picturesForCart/milk.jpg",
      description: "Fresh green",
      farmAddress: "Manor Farm, Blanket St, Alton GU34 3BD",
      farmId: 6,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 4.5,
    },
    {
      id: 7,
      name: "Long Bread",
      price: 14.0,
      discountPrice: 7,
      quantity: 5,
      category: "bakery",
      image: "/picturesForCart/bread.png",
      description: "Fresh green",
      farmAddress:
        "Horsenden Farm, Horsenden Ln N, Horsenden, Greenford UB6 7PQ",
      farmId: 7,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 1,
    },
    {
      id: 8,
      name: "slamon fish",
      price: 14.0,
      discountPrice: 7,
      quantity: 3,
      category: "fish",
      image: "/picturesForCart/salmon.jpg",
      description: "Fresh green",
      farmAddress:
        "Horsenden Farm, Horsenden Ln N, Horsenden, Greenford UB6 7PQ",
      farmId: 8,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 3,
    },
    {
      id: 9,
      name: "butter",
      price: 12.0,
      discountPrice: 7,
      quantity: 3,
      category: "dairy",
      image: "/picturesForCart/butter.jpg",
      description: "Fresh green",
      farmAddress: "The Ridgeway, London NW7 1QT",
      farmId: 9,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 5,
    },
    {
      id: 10,
      name: "purple grapes",
      price: 20.0,
      discountPrice: 7,
      quantity: 5,
      category: "fruits & veg",
      image: "/picturesForCart/purpleGrapes.jpg",
      description: "Fresh green",
      farmAddress: "The Ridgeway, London NW7 1QT",
      farmId: 10,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 4.8,
    },
    {
      id: 11,
      name: "full chicken",
      price: 25.0,
      discountPrice: 7,
      quantity: 3,
      category: "meat",
      image: "/picturesForCart/chicken.jpg",
      description: "Fresh green",
      farmAddress: "Coursers Rd, St Albans AL4 0PF",
      farmId: 11,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 4,
    },
    {
      id: 12,
      name: "basil",
      price: 25.0,
      discountPrice: 7,
      quantity: 3,
      category: "herbs",
      image: "/picturesForCart/basil.jpg",
      description: "Fresh green",
      farmAddress: "Coursers Rd, St Albans AL4 0PF",
      farmId: 12,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 3.5,
    },
    {
      id: 13,
      name: "strawberry jam",
      price: 25.0,
      discountPrice: 7,
      quantity: 3,
      category: "artisinal",
      image: "/picturesForCart/strawberryJam.jpg",
      description: "Fresh green",
      farmAddress: "Coursers Rd, St Albans AL4 0PF",
      farmId: 13,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 2.6,
    },
    {
      id: 14,
      name: "wheat",
      price: 25.0,
      discountPrice: 7,
      quantity: 3,
      category: "grains & crops",
      image: "/picturesForCart/wheat.jpg",
      description: "Fresh green",
      farmAddress: "Coursers Rd, St Albans AL4 0PF",
      farmId: 14,
      farmName: "julis",
      lat: 51.63642526757615,
      lng: -0.22908145521235895,
      rating: 4.5,
    },
    // Add more items as needed
  ]);

  const handleItemClick = (item: ShopItem) => {
    console.log(`Item clicked: ${item.id}`);
    setSelectedItem(item);
  };

  const handleAddToCart = (item: ShopItem) => {
    console.log(`Added to cart: ${item.name}`);
    setCartCount((prevCount) => prevCount + 1); // Increase cart count
  };

  // Filter items based on the selected category and search query
  const filteredItems = shopItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id: number) => {
    setShopItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };
  const recommendedItems = filteredItems; // Adjust the number as needed

  const discountPercentage = (item: ShopItem) =>
    Math.round(((item.price - item.discountPrice) / item.price) * 100);

  function handleClick(name: string): void {
    throw new Error("Function not implemented.");
  }

  const handleCategoryClick = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    filterItemsByCategory(category);
  };

  return (
    <>
      {/* Header and navbar */}
      <div className="Header__Container">
        <Header cartTotal={cartCount} />
      </div>

      <div className="Main__Body__Container">
        {/* Hero Image Section */}
        <HeroImage />

        {/* Filter & Search Section */}
        <div className="flex items-center space-x-4 ml-[150px]">
          {/* Category filter Section */}
          <div className="category-filter p-5 w-[250px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              placeholder="Search for products..."
              className="mt-2 p-2 border border-gray-300 rounded-xl w-full"
            />
          </div>
        </div>

        {/* Product display section */}
        <div>
          {/* Discounted Items section */}
          <div className="relative">
            <h3 className="ml-[150px] text-2xl text-customDarkGreen m-3 font-semibold mt-10">
              Weekly Discounts
            </h3>

            {/* Scrollable Container with Buttons */}
            <div className="relative flex items-center">
              {/* Left Button */}
              <button
                onClick={() => scroll(recommendedScrollRef, -700)}
                className="absolute left-12 bg-white p-5 rounded-full shadow-md border border-gray-300 
                  hover:bg-gray-100 transition-all hidden md:flex focus:outline-none"
              >
                <ChevronLeft />
              </button>

              {/* Discounted Items */}
              <div
                ref={recommendedScrollRef}
                className="recommended-items flex gap-4 overflow-x-auto scrollbar-hide p-5 mb-1 scroll-smooth w-full ml-[150px] mr-[150px]"
              >
                {recommendedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="min-w-[240px] min-h-[390px] shadow-lg p-0 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-between rounded-xl"
                  >
                    <div className="relative">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleLike(item.id);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full border bg-gray-200/80 hover:bg-gray-100 shadow-md transition-all duration-300 ease-in-out transform active:scale-110"
                      >
                        <Heart
                          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
                            item.liked
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <div className="absolute top-3 left-2 pl-3 pt-1 rounded-2xl bg-customLightGreen shadow-md transition-all duration-300 ease-in-out transform active:scale-110 text-white w-14 h-8 font-bold">
                        {discountPercentage(item)}%
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[180px] object-cover rounded-xl"
                      />
                      <div className="p-4">
                        <p className="text-md text-gray-500 font-medium">
                          {item.category}
                        </p>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <StarRating rating={item.rating} />
                        <p className="text-gray-300">----------</p>
                        <p className="">
                          <span className="text-customDarkGreen text-2xl font-bold mr-2">
                            £{item.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-gray-500 line-through mr-2 text-lg font-bold">
                            £{item.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="mt-2 border-[1px] w-auto  h-9 border-customLightGreen bg-white text-customLightGreen rounded-xl
                        hover:bg-customDarkGreen hover:border-customDarkGreen hover:text-white transition-all duration-200 font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={() => scroll(recommendedScrollRef, 700)}
                className="absolute right-12 bg-white p-5 rounded-full shadow-md border border-gray-300 
                  hover:bg-gray-100 transition-all hidden md:flex focus:outline-none"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Featured section */}
          <div className="relative">
            <h3 className="ml-[150px] text-2xl text-customDarkGreen m-3 font-semibold mt-10">
              Raccomended For You
            </h3>

            {/* Scrollable Container with Buttons */}
            <div className="relative flex items-center">
              {/* Left Button */}
              <button
                onClick={() => scroll(featuredScrollRef, -700)}
                className="absolute left-12 bg-white p-5 rounded-full shadow-md border border-gray-300 
                  hover:bg-gray-100 transition-all hidden md:flex focus:outline-none"
              >
                <ChevronLeft />
              </button>

              {/* Featured Items */}
              <div
                ref={featuredScrollRef}
                className="featured-items flex gap-4 overflow-x-auto scrollbar-hide p-5 mb-1 scroll-smooth w-full ml-[150px] mr-[150px]"
              >
                {recommendedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="min-w-[240px] min-h-[390px] shadow-lg p-0 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-between rounded-xl"
                  >
                    <div className="relative">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleLike(item.id);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full border bg-gray-200/80 hover:bg-gray-100 shadow-md transition-all duration-300 ease-in-out transform active:scale-110"
                      >
                        <Heart
                          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
                            item.liked
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[180px] object-cover rounded-xl"
                      />
                      <div className="p-4">
                        <p className="text-md text-gray-500 font-medium">
                          {item.category}
                        </p>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <StarRating rating={item.rating} />
                        <p className="text-gray-300">----------</p>
                        <p className="text-customDarkGreen text-2xl font-bold">
                          £{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="mt-2 border-[1px] w-auto  h-9 border-customLightGreen bg-white text-customLightGreen rounded-xl
                        hover:bg-customDarkGreen hover:border-customDarkGreen hover:text-white transition-all duration-200 font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={() => scroll(featuredScrollRef, 700)}
                className="absolute right-12 bg-white p-5 rounded-full shadow-md border border-gray-300 
                  hover:bg-gray-100 transition-all hidden md:flex focus:outline-none"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* category display section */}
        <div className="relative mb-20 mt-10">
          <h3 className="text-2xl font-semibold text-customDarkText mb-5 ml-[150px]">
            Explore our categories
          </h3>
          <div className="grid grid-cols-4 gap-x-0 gap-y-2 ml-[150px]">
            <button className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🍏 Fruit & Vegetables
            </button>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🥩 Meats & Seafood
            </div>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🥛 Dairy
            </div>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🥖 Bread & Backery
            </div>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🌾 Grains & Crops
            </div>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🌿 Herbs & Spices
            </div>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🍯 Artiinal Products
            </div>
            <div className="w-[350px] h-[70px] bg-gray-100 shadow-md rounded-xl transition-transform hover:scale-105 text-xl text-customDarkGreen font-semibold flex items-center justify-items-start pl-10">
              🦐 Fish & Seafood
            </div>
          </div>
        </div>

        {/* Subscribe section */}
        <div className="flex gap-2">
          <div
            className="ml-[230px] w-[700px] h-[400px] rounded-xl mr-0s"
            style={{
              backgroundImage: "url('/picturesForShop/bg11.jpg')",
            }}
          ></div>
          <div
            className="mr-[180px] w-[700px] h-[400px] bg-customDarkGreen rounded-xl"
            style={{
              backgroundImage: "url('/picturesForShop/bg3.jpg')",
            }}
          ></div>
        </div>

        {/* Four Section  */}
        <div className="mt-10 px-[150px]">
          <h3 className="text-2xl text-customDarkGreen font-semibold mb-6">
            Discover More
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Column 1: Top Sells */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                🔥 Top Sells
              </h4>
              {recommendedItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-md transition-all bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <StarRating rating={item.rating} />
                    <p className="text-customDarkGreen font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="p-2 rounded-full border bg-gray-200/80 hover:bg-gray-100 shadow-md transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        item.liked
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Column 2: Top Liked */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                ❤️ Top Liked
              </h4>
              {recommendedItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-md transition-all bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <StarRating rating={item.rating} />
                    <p className="text-customDarkGreen font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="p-2 rounded-full border bg-gray-200/80 hover:bg-gray-100 shadow-md transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        item.liked
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Column 3: Near You */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                📍 Near You
              </h4>
              {recommendedItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-md transition-all bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <StarRating rating={item.rating} />
                    <p className="text-customDarkGreen font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="p-2 rounded-full border bg-gray-200/80 hover:bg-gray-100 shadow-md transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        item.liked
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Column 4: Recently Added */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                🆕 Recently Added
              </h4>
              {recommendedItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-md transition-all bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <StarRating rating={item.rating} />
                    <p className="text-customDarkGreen font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="p-2 rounded-full border bg-gray-200/80 hover:bg-gray-100 shadow-md transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        item.liked
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* full Items display Section */}

        <h3 className="text-2xl text-customDarkText font-semibold mb-2 mt-20 ml-[150px]">
          View Full Catalogue
        </h3>
        <div className="shop-items grid grid-cols-6 gap-4 p-5 mr-[150px] ml-[150px] mb-20">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="min-w-[240px] min-h-[390px] shadow-lg p-0 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-between rounded-xl"
            >
              <div className="relative">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-300/80 border hover:bg-gray-100 shadow-md transition-all duration-300 ease-in-out transform active:scale-110"
                >
                  <Heart
                    className={`w-6 h-6 transition-all duration-300 ease-in-out ${
                      item.liked ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
                  />
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[180px] object-cover rounded-xl"
                />
                <div className="p-4">
                  <p className="text-md text-gray-500 font-medium">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <StarRating rating={item.rating} />
                  <p className="text-gray-300">----------</p>
                  <p className="text-customDarkGreen text-2xl font-bold">
                    £{item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToCart(item);
                }}
                className="mt-2 border-[1px] w-auto  h-9 border-customLightGreen bg-white text-customLightGreen rounded-xl
              hover:bg-customDarkGreen hover:border-customDarkGreen hover:text-white transition-all duration-200 font-semibold"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Modal (Popup) */}
        {selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[1300px] h-[800px] max-w-full max-h-full">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-[400px] h-[300px] object-cover rounded-lg"
              />
              <div className="ml-2">
                <h3 className="text-md font-bold mt-5 mb-2 text-grey-200">
                  {selectedItem.category}
                </h3>
                <h2 className="text-2xl font-bold mb-2 text-black">
                  {selectedItem.name}
                </h2>
                <StarRating rating={selectedItem.rating} />
                <p className="text-gray-300">----------</p>
                <p className="text-customDarkGreen font-bold text-2xl">
                  £{selectedItem.price.toFixed(2)}
                </p>
              </div>
              <p className="text-gray-700 mt-2">{selectedItem.description}</p>
              <button
                onClick={() => handleAddToCart(selectedItem)}
                className="mt-2 border-[1px] w-40 h-9 border-customLightGreen bg-white text-customLightGreen p-2 rounded-3xl
                  hover:bg-customDarkGreen hover:border-customDarkGreen hover:text-white transition-all duration-200"
              >
                Add to Cart
              </button>
              {/* Close Button (X) */}
              <button
                onClick={closeModal}
                className="items-centre absolute top-3 left-6 rounded-full bg-black w-[50px] h-[50px] text-white hover:text-red-500 transition duration-300 text-4xl"
              >
                x{" "}
              </button>

              <div className="p-5">
                <h1 className="text-xl font-bold mb-4">About this product:</h1>
                <p>------</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopPage;
function filterItemsByCategory(category: React.SetStateAction<string>) {
  throw new Error("Function not implemented.");
}
