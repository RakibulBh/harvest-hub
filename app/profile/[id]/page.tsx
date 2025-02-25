"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../MkComponents/Header";  // ✅ Adjusted import path
import Footer from "../../MkComponents/Footer";  // ✅ Corrected import path

type Farmer = {
    id: number;
    name: string;
    contact: string;
    address: string;
    postcode: string;
    email: string;
    phone: string;
    description: string;
};

type Product = {
    product_id: number;
    product_name: string;
    category: string;
    unit_price: number | string;
    unit: string;
    description: string;
    available_stock: number;
    image_url: string | null;
    harvest_date: string;
    best_before_date: string;
};

// ✅ Utility function to validate image URLs
const isValidUrl = (url: string | null): boolean => {
    try {
        if (!url) return false;
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export default function FarmDetails() {
    const params = useParams();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params.id) return;
        
        setLoading(true);
        setError(null);

        fetch(`/api/profiles/${params.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setFarmer(data.farmer);
                setProducts(data.products);
            })
            .catch((error) => {
                console.error("Error fetching farm details:", error);
                setError("Failed to fetch farm details.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading farm details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    if (!farmer) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">No farm details found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <Header />

            {/* ✅ Farmer Details */}
            <h1 className="text-4xl font-bold mb-6 text-[#013A40]">{farmer.name}</h1>
            <p className="text-lg mb-4"><strong>Contact Name:</strong> {farmer.contact}</p>
            <p className="text-lg mb-4"><strong>Address:</strong> {farmer.address}, {farmer.postcode}</p>
            <p className="text-lg mb-4"><strong>Email:</strong> {farmer.email}</p>
            <p className="text-lg mb-4"><strong>Phone:</strong> {farmer.phone}</p>
            <p className="text-lg"><strong>Description:</strong> {farmer.description}</p>

            {/* ✅ Products List */}
            <h2 className="text-3xl font-bold mt-10 mb-4 text-[#013A40]">Products</h2>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Link 
                            key={product.product_id} 
                            href={`/profile/${farmer.id}/${product.product_name.replace(/\s+/g, '').toLowerCase()}`}
                            className="block"
                        >
                            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition">
                                <Image
                                    src={
                                        isValidUrl(product.image_url)
                                            ? product.image_url!
                                            : "https://via.placeholder.com/300"
                                    }
                                    alt={product.product_name}
                                    width={300}
                                    height={200}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold">{product.product_name}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-sm"><strong>Category:</strong> {product.category}</p>
                                <p className="text-sm">
                                    <strong>Price:</strong> £
                                    {typeof product.unit_price === "number"
                                        ? product.unit_price.toFixed(2)
                                        : parseFloat(product.unit_price).toFixed(2)} 
                                    per {product.unit}
                                </p>
                                <p className="text-sm"><strong>Stock:</strong> {product.available_stock} units</p>
                                <p className="text-sm"><strong>Harvest Date:</strong> {product.harvest_date}</p>
                                <p className="text-sm"><strong>Best Before:</strong> {product.best_before_date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No products available.</p>
            )}

            <Footer />
        </div>
    );
}
