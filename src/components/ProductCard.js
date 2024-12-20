'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [inCart, setInCart] = useState(false); 
  const [productQuantity, setProductQuantity] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false); 


  const verifyUser = async () => {
    try {
      const { data } = await axios.get('https://e-commerce-backend-gper.onrender.com/api/auth/verify', { withCredentials: true });
      setUserId(data.id); 
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const getCart = async (userId) => {
    try {
      const response = await axios.get(`https://e-commerce-backend-gper.onrender.com/api/cart/getUserCart/${userId}`, { withCredentials: true });
      setCartItems(response.data.cart.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    const fetchUserAndCart = async () => {
      await verifyUser(); 
      if (userId) {
        await getCart(userId);
      }
    };
    fetchUserAndCart();
  }, [userId]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const productInCart = cartItems.find((item) => item.productId._id === product._id);
      if (productInCart) {
        setInCart(true);
        setProductQuantity(productInCart.quantity);
      } else {
        setInCart(false);
        setProductQuantity(0);
      }
    } else {
      setInCart(false);
      setProductQuantity(0);
    }
  }, [cartItems, product._id]);

  const handleAddToCart = async () => {
    setIsUpdating(true);
    try {
      await axios.post(
        'https://e-commerce-backend-gper.onrender.com/api/cart/addToCart',
        { userId, productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      await getCart(userId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const increaseQuantity = async () => {
    setIsUpdating(true);
    try {
      await axios.post(
        'https://e-commerce-backend-gper.onrender.com/api/cart/addToCart',
        { userId, productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      await getCart(userId); 
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
        await axios.post(
          'https://e-commerce-backend-gper.onrender.com/api/cart/decreaseQuantity',
          { userId, productId: product._id },
          { withCredentials: true }
        );

        if (productQuantity === 1) {
          setInCart(false);
          setProductQuantity(0);
        } else {
          setProductQuantity((prev) => prev - 1);
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
    <div className="w-full p-2 bg-cardClr border border-gray-300 rounded-xl shadow-md hover:shadow-xl overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/productDetails/${userId}/${product._id}`}>
          <img
            src={product.images[0] || 'https://via.placeholder.com/200'}
            alt={product.name}
            className="w-full h-60 rounded-xl object-cover bg-gray-100"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-2 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 flex-1">{product.name} </h3>
          <p className="text-lg font-bold text-gray-900 whitespace-nowrap">₹{product.price}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

        {/* Show quantity controls or "Add to Cart" button */}
        <div className="flex items-center justify-between mt-4">
          {inCart ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={decreaseQuantity}
                disabled={isUpdating}
              >
                <i className="bi bi-dash-circle text-2xl text-gray-400"></i>

              </button>
              <span className="text-lg font-medium">{productQuantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={isUpdating}
              >
            <i className="bi bi-plus-circle text-2xl text-gray-400"></i> 

              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 text-sm font-medium text-white bg-btnClr rounded-xl hover:bg-gray-900"
              disabled={isUpdating}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );


};

export default ProductCard;
