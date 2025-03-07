import React, { useEffect, useState } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "next/navigation";
import { useGeocoding } from "../api/geocode/route";

type Farm = {
  id: number;
  name: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
};

function map() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/shop");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setFarms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    // setFarms(); // This line is not needed and causes an error
  }, []);

  if (!farms) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      style={{ height: "35vh", width: "33%" }}
      className="ml-auto mt-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      {farms.map((farm) => (
        <Marker position={[farm.lat, farm.lng]}></Marker>
      ))}
    </MapContainer>
  );
}

export default map;
