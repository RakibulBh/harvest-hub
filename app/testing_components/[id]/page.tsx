"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
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
        console.error("Error fetching farm details:", error);
        alert("Failed to fetch farm details.");
      });
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-[#013A40]">{product.name}</h1>
    </div>
  );
}
function setProduct(data: any): any {
  throw new Error("Function not implemented.");
}
