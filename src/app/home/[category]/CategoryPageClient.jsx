// app/products/[category]/CategoryPageClient.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard';

const CategoryPageClient = ({ initialProducts, category, initialTotalPages }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    limit: 10,
    sort: '',
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const fetchFilteredProducts = async () => {
    const { minPrice, maxPrice, limit, sort, page } = filters;
    setIsLoading(true);

    try {
      const response = await axios.get('https://e-commerce-backend-gper.onrender.com/api/product/getProducts', {
        params: {
          category,
          minPrice,
          maxPrice,
          limit,
          sort,
          page,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching filtered products:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFilteredProducts();
    setIsLoading(false);
  }, [filters]); // Fetch when filters change

  const handleFilterChange = (e) => {
    setIsLoading(true);
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setIsLoading(false);
  };

  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, page: pageNumber }));
    setIsLoading(false);
  };

  return (
    <div className="bg-bgClr min-h-screen p-6">

        {/* Loader */}
        {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center z-20">
          <div className="w-16 h-16 border-4 border-t-4 border-t-[#4A90E2] border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}


      {/* Category Heading */}
      <h2 className="text-3xl font-bold  text-gray-900 mb-8">
        Category: <span className="text-btnClr">{category}</span>
      </h2>

      {/* Filters Section */}
      <div className="filters bg-cardClr p-4 rounded-xl shadow-md flex flex-wrap gap-4 justify-evenly items-center mb-8">
        <div className='flex space-x-4 items-center'>
          <p className='font-semibold text-lg'>
            Min Price
          </p>
          <input
            type="number"
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-32 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-btnClr"
          />
        </div>

        <div className='flex space-x-4 items-center'>
          <p className='font-semibold text-lg'>
            Max Price
          </p>
        <input
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="w-32 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-btnClr"
        />
        </div>

        <div className='flex space-x-4 items-center'>
          <p className='font-semibold text-lg'>
            Limit
          </p>
        <input
          type="number"
          placeholder="Limit"
          name="limit"
          value={filters.limit}
          onChange={handleFilterChange}
          className="w-32 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-btnClr"
        />
        </div>

        <div className='flex space-x-4 items-center'>
          <p className='font-semibold text-lg'>
            Sort By
          </p>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="w-40 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-btnClr"
        >
          <option value="">Select Option</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        </div>
        <button
          onClick={fetchFilteredProducts}
          className="px-4 py-2 bg-btnClr text-white font-medium rounded-md hover:bg-gray-900 transition duration-300"
        >
          Go
        </button>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-700">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Pagination Section */}
      <div className="pagination flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={filters.page === index + 1}
            className={`mx-1 px-3 py-2 rounded-md text-sm font-medium ${filters.page === index + 1
                ? "bg-btnClr text-white cursor-not-allowed"
                : "bg-cardClr text-gray-700 hover:bg-btnClr hover:text-white transition duration-300"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );

};

export default CategoryPageClient;
