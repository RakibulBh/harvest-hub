"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../sb-components/header3";
import MapComponent from "@/app/components/MapComponent";
import { Footer } from "@/app/components/Footer";
import Map from "../../sb-components/map";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
};

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/shop/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error("Error fetching product details:", error);
        alert("Failed to fetch product details.");
      });
  }, [params.id]);

  if (!product) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      {/* Maind Product Display */}
      <div className=" min-h-screen">
        <div className="bg-gray-100 w-full h-[700px] py-10 ">
          <div className="max-w-7xl mx-[199.5px] px-6 lg:px-8 ">
            {/* product link */}
            <div className="flex">
              <h1
                className="text-sm font-semibold font-sans text-gray-500 hover:underline"
                onClick={() => {
                  window.location.href = "./";
                }}
              >
                Shop &nbsp; &nbsp; /
              </h1>
              <h1 className="text-sm font-semibold font-sans text-green-600">
                &nbsp; &nbsp; {product.name}
              </h1>
            </div>

            {/* image and details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />
              <div>
                <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                <p className="text-xl text-gray-700 mb-4">${product.price}</p>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="flex items-center mb-6">
                  <span className="text-sm text-gray-500">Availability:</span>
                  <span className="ml-2 font-semibold text-green-600">
                    {product.stock} in stock
                  </span>
                </div>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 ">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description and location */}
        <div className="flex mx-[199.5px]">
          <div>
            <h1 className="mt-10 mb-5 text-2xl font-bold ">Description</h1>
            <p className="">{product.description}</p>
            <p className=""></p>
            <p className="">{product.description}</p>
          </div>
          <Map />
        </div>

        {/* Raccomended Items */}
        <h3 className="text-2xl font-bold mt-20 mb-6 mx-[199.5px]">
          You may also like
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-[199.5px]">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <p className="mt-4 text-lg font-semibold">Product {item}</p>
                <p className="text-gray-500">$20</p>
              </div>
            </div>
          ))}
        </div>

        {/* Raccomended Items */}
        <h3 className="text-2xl font-bold mt-20 mb-6 mx-[199.5px]">
          Sellers other products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-[199.5px]">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <p className="mt-4 text-lg font-semibold">Product {item}</p>
                <p className="text-gray-500">$20</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="h-[500px] w-full mt-[50px]  flex ">
          {/* about seller section */}
          <div className="w-2/6 h-full ml-[199.5px] border-r-slate-100 border-r-2">
            <h1 className="font-bold text-2xl mt-10">About this seller </h1>
            <img
              src="/picturesForShop/seller.jpg"
              alt="seller"
              className="w-40 h-40 mt-10 rounded-full object-cover"
            />

            {/* buttons for contacting and viewing seller */}
            <button
              className="bg-green-600 border-green-600 border-2 text-white text-xl font-semibold rounded-3xl w-[400px] h-[40px] flex items-center justify-center mt-10"
              onClick={() => {
                window.location.href = "/testing_components";
              }}
            >
              Visit Seller Shop
            </button>
            <button
              className="bg-white border-2 border-green-600 text-green-600 font-semibold text-xl rounded-3xl w-[400px] h-[40px] items-center justify-center mt-2 "
              onClick={() => {
                window.location.href = "/inbox";
              }}
            >
              contact seller
            </button>
          </div>

          {/* View product reivews */}
          <div className="w-5/6 h-full ">
            <h1 className="font-bold text-2xl mt-10 ml-10">Reviews</h1>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
