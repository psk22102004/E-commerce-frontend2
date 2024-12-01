import axios from 'axios';
import CategoryPageClient from './CategoryPageClient.jsx'; 

async function fetchInitialProducts(category, filters) {
  const { minPrice, maxPrice, limit = 10, sort = '', page = 1 } = filters;

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

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalPages: 0 };
  }
}

const CategoryPage = async ({ params, searchParams }) => {
  const { category } = params;

  const filters = {
    minPrice: searchParams.minPrice || '',
    maxPrice: searchParams.maxPrice || '',
    limit: searchParams.limit || 10,
    sort: searchParams.sort || '',
    page: searchParams.page || 1,
  };

  const { products, totalPages } = await fetchInitialProducts(category, filters);

  return (
    <CategoryPageClient
      initialProducts={products}
      category={category}
      initialTotalPages={totalPages}
    />
  );
};

export default CategoryPage;
