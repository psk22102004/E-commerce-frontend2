'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ProductDetailsPageClient = ({ productDetails, userId, productId }) => {
  const [cartItems, setCartItems] = useState([]); 
  const [productQuantity, setProductQuantity] = useState(0); 
  const [isUpdating, setIsUpdating] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);


  const [activeImage, setActiveImage] = useState(productDetails.images[0]);


  console.log(productDetails);

  const getCart = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://e-commerce-backend-gper.onrender.com/api/cart/getUserCart/${userId}`, { withCredentials: true });
      setCartItems(response.data.cart.items || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCart = async () => {
      await getCart(userId);
    };
    fetchCart();
    setIsLoading(false);
  }, [userId]); 

  
  useEffect(() => {
    const productInCart = cartItems.find((item) => item.productId._id === productId);
    if (productInCart) {
      setProductQuantity(productInCart.quantity);
    } else {
      setProductQuantity(0);
    }
  }, [cartItems, productId]);

 
  const handleAddToCart = async () => {
    setIsUpdating(true);
    try {
      if (productDetails.stock > 0 && productQuantity === 0) {
        await axios.post(
          'https://e-commerce-backend-gper.onrender.com/api/cart/addToCart',
          { userId, productId, quantity: 1 },
          { withCredentials: true }
        );
        await getCart(userId); 
      } else {
        alert('Product is already in the cart or no stock available');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  
  const increaseQuantity = async () => {
    setIsUpdating(true);
    try {
      if (productQuantity < productDetails.stock) {
        await axios.post(
          'https://e-commerce-backend-gper.onrender.com/api/cart/addToCart',
          { userId, productId, quantity: 1 },
          { withCredentials: true }
        );
        await getCart(userId); 
      } else {
        alert('Not enough stock available');
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  
  const decreaseQuantity = async () => {
    if (productQuantity > 0) {
      setIsUpdating(true);
      try {
        if (productQuantity === 1) {
          await axios.post(
            'https://e-commerce-backend-gper.onrender.com/api/cart/decreaseQuantity',
            { userId, productId },
            { withCredentials: true }
          );
        } else {
          await axios.post(
            'https://e-commerce-backend-gper.onrender.com/api/cart/decreaseQuantity',
            { userId, productId },
            { withCredentials: true }
          );
        }
        await getCart(userId); 
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Loader */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center z-20">
          <div className="w-16 h-16 border-4 border-t-4 border-t-[#4A90E2] border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}


      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/home" className="hover:underline text-gray-400">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href={`/home/${productDetails.category}`}
          className="hover:underline text-gray-600"
        >
          {productDetails.category}
        </Link>{" "}
        / <span className="font-semibold text-gray-800">{productDetails.name}</span>
      </nav>

      <div className="container mx-auto flex flex-col lg:flex-row gap-12 items-center lg:items-start">
        {/* Left: Product Image */}
        <div className="lg:w-1/2 space-y-4">
          {/* Main Product Image */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <img
              src={activeImage}
              alt={productDetails.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            {productDetails.images.map((img, index) => (
              <div key={index} className="cursor-pointer">
                <img
                  onClick={() => setActiveImage(img)}
                  src={img}
                  className={`h-20 w-full object-cover rounded-lg ${img === activeImage ? "ring-2 ring-gray-700" : "hover:opacity-80"
                    }`}
                  alt={`product-image-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 space-y-6">
          {/* Product Title */}
          <h1 className="text-4xl font-bold text-gray-800">{productDetails.name}</h1>

          {/* Product Description */}
          <p className="text-gray-600 leading-relaxed">{productDetails.description}</p>

          {/* Pricing and Cart Section */}
          <div className="flex items-center space-x-6">
            <p className="text-3xl font-semibold text-gray-800">
              ₹ {productDetails.price || "N/A"}
            </p>

            {productQuantity > 0 ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  disabled={isUpdating}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="bi bi-dash-circle text-2xl"></i>
                </button>
                <span className="text-lg font-medium text-gray-800">{productQuantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={isUpdating || productQuantity >= productDetails.stock}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="bi bi-plus-circle text-2xl"></i>
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 flex items-center text-sm font-medium text-white bg-btnClr rounded-lg hover:bg-gray-700 transition"
                disabled={isUpdating}
              >
                <i className="bi bi-cart text-xl pr-2"></i>
                Add to Cart
              </button>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Details:</h2>
            <ul className="grid grid-cols-2 gap-4 text-gray-600">
              <li>
                <span className="font-semibold text-gray-800">Category:</span>{" "}
                {productDetails.category}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Brand:</span>{" "}
                {productDetails.brand}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Colour:</span>{" "}
                {productDetails.colour}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Box Includes:</span>{" "}
                {productDetails.box_includes}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProductDetailsPageClient;
