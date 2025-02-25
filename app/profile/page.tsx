"use client";

import React, { useEffect, useState } from "react";
import Header from "../MkComponents/Header"; 
import Footer from "../MkComponents/Footer"; 
import ProfileCard from "./ProfileCard";

type Farm = {
    id: number;
    name: string;
    contact: string;
    address: string;
    postcode: string;
    email: string;
    phone: string;
    description: string;
    products?: Product[];
};

type Product = {
    product_id: number;
    product_name: string;
};

export default function Profile() {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchType, setSearchType] = useState<"farm" | "product">("farm");

    useEffect(() => {
        fetch("/api/profiles")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setFarms(data))
            .catch((error) => {
                console.error("Error fetching farms:", error);
                alert("Failed to fetch farm data. Please try again later.");
            });
    }, []);

    const filteredFarms = farms.filter((farm) => {
        if (searchType === "farm") {
            return farm.name.toLowerCase().includes(search.toLowerCase());
        } else if (farm.products) {
            return farm.products.some(product =>
                product.product_name.toLowerCase().includes(search.toLowerCase())
            );
        }
        return false;
    });

    return (
        <div className="container mx-auto px-6 py-12">
             <Header />

            <h1 className="text-4xl font-bold mb-10 text-[#013A40]">Farm Profiles</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
                {/* Extended Search Input */}
                <input
                    type="text"
                    placeholder={`Search ${searchType === "farm" ? "farms" : "products"}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-4/5 p-3 border border-gray-300 rounded-lg shadow-sm"  // Extended width to 4/5
                />

                {/* Dropdown aligned to the right */}
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as "farm" | "product")}
                    className="w-48 p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                    <option value="farm">Search by Farm</option>
                    <option value="product">Search by Product</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFarms.length > 0 ? (
                    filteredFarms.map((farm) => <ProfileCard key={farm.id} farm={farm} />)
                ) : (
                    <p className="text-gray-600">No results found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
