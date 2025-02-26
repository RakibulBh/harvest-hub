import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="category-filter container p-5 w-[250px]">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded-2xl ml-20 w-[200px]"
      >
        <option value="All">All</option>
        <option value="fruits & veg">Fruits & Veg</option>
        <option value="meat">Meat</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
