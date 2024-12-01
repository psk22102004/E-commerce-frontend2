'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


const CartPage = () => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false); // To track when updates are in progress
  const [isLoading, setIsLoading] = useState(false);


  // Function to verify the user and get the userId
  const verifyUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://e-commerce-backend-gper.onrender.com/api/auth/verify', { withCredentials: true });
      setUserId(data.id); // Set userId if verification succeeds
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error verifying user:', error);
    }
  };

  // Fetch cart items from the API
  const getCart = async () => {
    setIsLoading(true);
    if (!userId){
      setIsLoading(false);
      return;
    } 
    try {
      setIsLoading(true);
      const response = await axios.get(`https://e-commerce-backend-gper.onrender.com/api/cart/getUserCart/${userId}`, { withCredentials: true });
      setCartItems(response.data.cart.items || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching cart:', error);
    }
  };

  // Fetch user details and cart items when the component mounts
  useEffect(() => {
    setIsLoading(true);
    verifyUser(); // Verify user to get userId
    setIsLoading(false);
  }, []); // Only run on initial render

  // Fetch cart once userId is available
  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      getCart(); // Fetch cart when userId is set
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [userId]); // Dependency on userId

  // Handle adding to the cart (for existing items)
  const increaseQuantity = async (productId) => {
    setIsUpdating(true);
    try {
      await axios.post(
        'https://e-commerce-backend-gper.onrender.com/api/cart/addToCart',
        { userId, productId, quantity: 1 },
        { withCredentials: true }
      );
      await getCart(); // Fetch updated cart
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle decreasing the quantity in the cart
  const decreaseQuantity = async (productId) => {
    setIsUpdating(true);
    try {
      await axios.post(
        'https://e-commerce-backend-gper.onrender.com/api/cart/decreaseQuantity',
        { userId, productId },
        { withCredentials: true }
      );
      await getCart(); // Fetch updated cart
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle removing the product from the cart
  const removeFromCart = async (productId) => {
    setIsUpdating(true);
    try {
      await axios.post(
        'https://e-commerce-backend-gper.onrender.com/api/cart/removeFromCart',
        { userId, productId },
        { withCredentials: true }
      );
      await getCart(); // Fetch updated cart
    } catch (error) {
      console.error('Error removing product:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  if (!userId) {
    return <p>Loading...</p>; // Show loading message while verifying user
  }

  return (
    <div className="cart-page p-6 bg-bgClr min-h-screen text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Cart Items */}
          <div className="cart-items space-y-6 lg:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="cart-item border border-gray-400  bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col md:flex-row items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-32 flex-shrink-0">
                  <img
                    src={item.productId.images[0]}
                    alt={item.productId.name}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-2 md:gap-4 flex-grow">
                  <Link href={`/productDetails/${userId}/${item.productId._id}`}>
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-btnClr">
                      {item.productId.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-2 max-w-lg">
                    {item.productId.description}
                  </p>
                  <p className="text-gray-500 text-sm font-medium">
                    Brand: <span className="text-gray-700">{item.productId.brand}</span>
                  </p>
                  <p className="text-gray-500 text-sm font-medium">
                    Category: <span className="text-gray-700">{item.productId.category}</span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.productId._id)}
                    disabled={isUpdating || item.quantity === 0}
                  >
                    <i className="bi bi-dash-circle text-2xl text-gray-400"></i>
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.productId._id)}
                    disabled={isUpdating || item.productId.stock === 0}
                  >
                    <i className="bi bi-plus-circle text-2xl text-gray-400"></i>
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  <i className="bi bi-trash-fill"></i>

                </button>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="price-summary bg-white p-6 rounded-lg shadow-md lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              {/* Price Information */}
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-gray-600">
                  <span>{item.productId.name} (x{item.quantity})</span>
                  <span>₹{(item.productId.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            {/* Subtotal */}
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <span>Subtotal</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            {/* Taxes and Shipping */}
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Estimated Tax</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="my-4" />
            {/* Total */}
            <div className="flex justify-between text-xl font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            {/* Checkout Button */}
            <button
              onClick={() => alert("Proceeding to checkout")}
              className="w-full mt-6 px-6 py-3 bg-btnClr text-white rounded-lg hover:bg-gray-800 transition"
              disabled={isUpdating || cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );



};

export default CartPage;
