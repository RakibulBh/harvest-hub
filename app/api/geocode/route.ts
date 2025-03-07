import { useState } from "react";

interface Geocode {
  lat: number;
  lon: number;
}

interface GeocodeError {
  message: string;
}

export const useGeocoding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeocodeError | null>(null);

  const geocodeAddress = async (
    address: string,
    postcode: string
  ): Promise<Geocode | null> => {
    const fullAddress = `${address}, ${postcode}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          fullAddress
        )}`,
        {
          headers: {
            "User-Agent": "YourNextJsApp/1.0 (your-email@example.com)",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Geocoding request failed");
      }

      const data = await response.json();

      if (data.length === 0) {
        setError({ message: "No coordinates found for the given address" });
        return null;
      }

      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } catch (err) {
      setError({
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { geocodeAddress, isLoading, error };
};
