import React, { useState } from "react";
import {
  Truck,
  DollarSign,
  Award,
  Eye,
  Package,
  Users,
  Zap,
} from "lucide-react";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "supply",
      label: "Fruits & Veg",
      icon: <Truck className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "prices",
      label: "Meats",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "quality",
      label: "Milks & Dairy",
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "transparency",
      label: "Bakery",
      icon: <Eye className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "packaging",
      label: "Herbs & Spices",
      icon: <Package className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "community",
      label: "Artisanal",
      icon: <Users className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "delivery",
      label: "Fast delivery",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-red-100 text-red-600",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="w-full bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center px-4 py-3 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? "bg-white shadow-md scale-105"
                  : "bg-white hover:shadow-sm hover:scale-102"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mb-2`}
              >
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
