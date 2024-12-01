
import axios from 'axios';
import ProductDetailsPageClient from './ProductDetailsPageClient.jsx'; 

async function fetchProductDetails(productId) {
  try {
    const response = await axios.get(`https://e-commerce-backend-gper.onrender.com/api/product/getProduct/${productId}`);
    return response.data.product; 
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

const ProductDetailsPage = async ({ params }) => {
  const { userId, productId } = await params;

  const productDetails = await fetchProductDetails(productId);

  if (!productDetails) {
    return <p>Product not found</p>; 
  }

  return (
    <ProductDetailsPageClient
      productDetails={productDetails}
      userId={userId}
      productId={productId}
    />
  );
};

export default ProductDetailsPage;
