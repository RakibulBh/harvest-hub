/*"use client";

import React, { useState } } from "react";

type AddProductModalProps = {
    onClose: () => void;
    farmerId: number | undefined;
    fetchProducts: (farmerId: number) => void;
};

export default function AddProductModal({ onClose, farmerId, fetchProducts }: AddProductModalProps) {
    const [productData, setProductData] = useState({
        product_name: "",
        category: "",
        unit_price: "",
        unit: "",
        description: "",
        available_stock: "",
        image_url: "",
        harvest_date: "",
        best_before_date: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // ✅ Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Product Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!farmerId) {
            setError("Farmer ID is missing.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...productData, farm_id: farmerId }),
            });

            if (!response.ok) {
                throw new Error("Failed to add product.");
            }

            setSuccess("Product added successfully!");
            setProductData({
                product_name: "",
                category: "",
                unit_price: "",
                unit: "",
                description: "",
                available_stock: "",
                image_url: "",
                harvest_date: "",
                best_before_date: "",
            });

            fetchProducts(farmerId); // ✅ Refresh product list
        } catch (error) {
            setError("An error occurred while adding the product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-[#013A40]">Add Product</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <label className="block font-semibold">Product Name:</label>
                    <input
                        type="text"
                        name="product_name"
                        value={productData.product_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block font-semibold">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <label className="block font-semibold">Price (£):</label>
                    <input
                        type="number"
                        name="unit_price"
                        value={productData.unit_price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block font-semibold">Unit (e.g., kg, piece):</label>
                    <input
                        type="text"
                        name="unit"
                        value={productData.unit}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <label className="block font-semibold">Description:</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>

                    <label className="block font-semibold">Stock:</label>
                    <input
                        type="number"
                        name="available_stock"
                        value={productData.available_stock}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    <label className="block font-semibold">Image URL:</label>
                    <input
                        type="text"
                        name="image_url"
                        value={productData.image_url}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <label className="block font-semibold">Harvest Date:</label>
                    <input
                        type="date"
                        name="harvest_date"
                        value={productData.harvest_date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <label className="block font-semibold">Best Before Date:</label>
                    <input
                        type="date"
                        name="best_before_date"
                        value={productData.best_before_date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
*/