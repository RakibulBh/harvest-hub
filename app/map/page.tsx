"use client";
import React, { useState } from "react";
import { useGeocoding } from "../api/geocode/route"; // Ensure this path is correct or update it to the correct path

const LocationPage: React.FC = () => {
  // State for address input
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  // Use the geocoding hook
  const { geocodeAddress, isLoading, error } = useGeocoding();

  // State to store the geocoded coordinates
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // Handler for geocoding
  const handleGeocodeAddress = async () => {
    const result = await geocodeAddress(address, postcode);
    if (result) {
      setCoordinates(result);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Geocode Address</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="block mb-2">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter address"
          />
        </div>

        <div>
          <label htmlFor="postcode" className="block mb-2">
            Postcode
          </label>
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter postcode"
          />
        </div>

        <button
          onClick={handleGeocodeAddress}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Geocoding..." : "Get Coordinates"}
        </button>

        {error && <div className="text-red-500 mt-2">{error.message}</div>}

        {coordinates && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="font-bold mb-2">Coordinates</h2>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lon}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPage;
