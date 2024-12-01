// components/PopularCategories.js
'use client';

import Link from "next/link";

const PopularCategories = ({ categoryData }) => {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {categoryData.map((category, index) => (
        <div key={index} className="flex flex-col items-center">
        <Link href={`/home/${category.categoryName}`}>
          {/* Category Icon inside a Circle */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white mb-4 shadow-md">
            <img src={category.icon} alt={category.categoryName} className="w-12 h-12 object-contain" />
          </div>
          {/* Category Name */}
          <p className="text-lg text-center font-medium text-gray-800">{category.categoryName}</p>

          </Link>
        </div>
      ))}
    </div>
  );
};

export default PopularCategories;
