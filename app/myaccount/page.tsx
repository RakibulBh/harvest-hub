"use client";

import React, { useState } from "react";
import Header from "../MkComponents/Header"; 
import Footer from "../MkComponents/Footer"; 
import AddProductModal from "./AddProductModal";

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
    image_url: string | undefined;
    product_id: number;
    product_name: string;
    category: string;
    unit_price: number;
    unit: string;
    description: string;
    available_stock: number;
    harvest_date: string | null;
    best_before_date: string | null;
};

export default function MyAccount() {
    const [farmerId, setFarmerId] = useState<string>("");
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedFarmer, setUpdatedFarmer] = useState<Farmer | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
    const [errorProducts, setErrorProducts] = useState<string | null>(null);
    const [showAddProductModal, setShowAddProductModal] = useState(false); // Modal State

    //Fetch Farmer Data Based on Input ID
    const fetchFarmer = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/farmers/${farmerId}`);
            if (!response.ok) {
                throw new Error("Farmer not found.");
            }
            const data = await response.json();
            setFarmer(data);
            setUpdatedFarmer(data); 

                        // Fetch products ONLY if farmer exists
                        fetchProducts(data.id);
                    } catch (error: unknown) {
                        setError(error instanceof Error ? error.message : "An unexpected error occurred.");
                        setFarmer(null);
                    } finally {
                        setLoading(false);
                    }
                };
            
                //Fetch Products for the Given Farmer ID
                const fetchProducts = async (farmerId: number) => {
                    setLoadingProducts(true);
                    setErrorProducts(null);
            
                    try {
                        const response = await fetch(`/api/products/${farmerId}`);
                        if (!response.ok) {
                            throw new Error("No products found.");
                        }
                        const data = await response.json();
                        setProducts(data);
                    } catch (error: unknown) {
                        setErrorProducts(error instanceof Error ? error.message : "An unexpected error occurred.");
                        setProducts([]);
                    } finally {
                        setLoadingProducts(false);
                    }
                };
                
            
                // ✅ Handle Product Deletion
                const handleDeleteProduct = async (product_id: number) => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
                    if (!confirmDelete) return;
            
                    try {
                        const response = await fetch(`/api/products/${product_id}`, { method: "DELETE" });
            
                        if (!response.ok) {
                            throw new Error("Failed to delete product.");
                        }
            
                        setProducts(products.filter((product) => product.product_id !== product_id));
                        alert("Product deleted successfully!");
                    } catch (error) {
                        alert("An error occurred while deleting the product.");
                    }
                };
            

    //Handle input changes in the edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (updatedFarmer) {
            setUpdatedFarmer({
                ...updatedFarmer,
                [e.target.name]: e.target.value,
            });
        }
    };

    //Handle saving farm updates
    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/farmers/${farmerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFarmer),
            });

            if (!response.ok) {
                throw new Error("Failed to update details.");
            }

            setFarmer(updatedFarmer);
            setIsEditing(false);
            alert("Farm details updated successfully!");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred while updating.");
        } finally {
            setLoading(false);
        }
    };

    // Cancel Editing 
    const handleCancel = () => {
        setUpdatedFarmer(farmer); // Restore previous farmer data
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="container mx-auto px-6 py-12">
        <Header /> 
            <h1 className="text-4xl font-bold mb-6 text-[#013A40]">My Account</h1>

            {/* Farmer ID Input */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <label className="block font-semibold mb-2">Enter Farmer ID:</label>
                <input
                    type="text"
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={fetchFarmer}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Fetch Farmer Details
                </button>
            </div>

            {/*Display Farmer Details */}
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {farmer && updatedFarmer && (
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Farmer Details</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Edit Details
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                   {/*Editable Fields */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold">Farm ID:</label>
                            <p className="border border-gray-300 rounded p-2">{farmer.id}</p>
                        </div>
                        <div>
                            <label className="block font-semibold">Farm Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedFarmer.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            ) : (
                                <p className="border border-gray-300 rounded p-2">{farmer.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold">Contact Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="contact"
                                    value={updatedFarmer.contact}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            ) : (
                                <p className="border border-gray-300 rounded p-2">{farmer.contact}</p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold">Address:</label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={updatedFarmer.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            ) : (
                                <p className="border border-gray-300 rounded p-2">{farmer.address}</p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold">Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedFarmer.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            ) : (
                                <p className="border border-gray-300 rounded p-2">{farmer.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold">Phone:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={updatedFarmer.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            ) : (
                                <p className="border border-gray-300 rounded p-2">{farmer.phone}</p>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-semibold">Description:</label>
                            {isEditing ? (
                                <textarea
                                    name="description"
                                    value={updatedFarmer.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            ) : (
                                <p className="border border-gray-300 rounded p-2">{farmer.description}</p>
                            )}
                        </div>

                    </div>
                </div>
            )}

                        {/*Display Products (Only After Fetching Farmer) */}
                        {farmer && (
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-[#013A40]">Farm Products</h2>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            + Add Product
                        </button>
                    </div>

                    {loadingProducts && <p className="text-gray-500 mt-6">Loading products...</p>}
                    {errorProducts && <p className="text-red-500 mt-6">{errorProducts}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {products.map((product) => (
                            <div key={product.product_id} className="border border-gray-300 rounded-lg p-4 shadow-md">
                                <img
                                    src={product.image_url}
                                    alt={product.product_name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-semibold">{product.product_name}</h3>
                                <p className="text-gray-700">{product.description}</p>
                                <p className="text-gray-700">Category: {product.category}</p>
                                <p className="text-gray-700">Price: £{product.unit_price} per {product.unit}</p>
                                <p className="text-gray-700">Stock: {product.available_stock}</p>
                                <p className="text-gray-700">Harvest Date: {product.harvest_date || "N/A"}</p>
                                <p className="text-gray-700">Best Before: {product.best_before_date || "N/A"}</p>
                                <div className="mt-4 flex justify-between">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.product_id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
                
            )}            {/* Add Product Modal when needed */}
            {showAddProductModal && (
                <AddProductModal
                    onClose={() => setShowAddProductModal(false)} //Close Modal
                    farmerId={farmer?.id}
                    fetchProducts={fetchProducts}
                />
            )}
            <Footer />
        </div>

    );

}


