// app/productDetails/[userId]/[productId]/page.jsx

import axios from 'axios';
import ProductDetailsPageClient from './ProductDetailsPageClient.jsx'; // Import the client-side component

// Fetch product details using the productId
async function fetchProductDetails(productId) {
  try {
    const response = await axios.get(`https://e-commerce-backend-gper.onrender.com/api/product/getProduct/${productId}`);
    return response.data.product; // Assuming the response contains the product details
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

const ProductDetailsPage = async ({ params }) => {
  // Await params to handle them properly
  const { userId, productId } = await params; // Await the params

  // Fetch product details server-side
  const productDetails = await fetchProductDetails(productId);

  if (!productDetails) {
    return <p>Product not found</p>; // If product not found
  }

  // Pass product details as props to the client-side component
  return (
    <ProductDetailsPageClient
      productDetails={productDetails}
      userId={userId}
      productId={productId}
    />
  );
};

export default ProductDetailsPage;
