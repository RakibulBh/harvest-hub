"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
});

interface ShopItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  farmAddress: string;
  farmId: number;
  farmName: string;
  lat: number;
  lng: number;
}

export default function MapComponent({ shopItems }: { shopItems: ShopItem[] }) {
  // Ensure there is at least one item before setting the center
  const defaultCenter: [number, number] =
    shopItems.length > 0
      ? [shopItems[0].lat, shopItems[0].lng]
      : [51.6364, -0.22908];

  return (
    <div className="h-[350px] w-[400px] mt-10 border border-gray-300 rounded-lg shadow-lg overflow-hidden translate-x-[825px] translate-y-[-220px]">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {/* Loop through all shopItems and display their markers */}
        {shopItems.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={customIcon}
          >
            <Popup>
              <strong>{item.farmName}</strong> <br />
              {item.farmAddress} <br />
              <em>{item.name}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
