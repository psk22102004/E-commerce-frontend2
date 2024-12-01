'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BestSellerCard = ({ product }) => {
  const [userId, setUserId] = useState(null);


  // Function to verify the user and get the userId
  const verifyUser = async () => {
    try {
      const { data } = await axios.get('https://e-commerce-backend-gper.onrender.com/api/auth/verify', { withCredentials: true });
      setUserId(data.id); // Set userId if verification succeeds
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };


  // Fetch user details and cart items when the component mounts
  useEffect(() => {
    const fetchUserAndCart = async () => {
      await verifyUser(); // Verify user and set userId
    };
    fetchUserAndCart();
  }, [userId]); // Dependency on userId




  return (
    <div className="w-full p-2 bg-cardClr border border-gray-300 rounded-xl shadow-md hover:shadow-xl overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/productDetails/${userId}/${product._id}`}>
          <img
            src={product.images[0] || 'https://via.placeholder.com/200'} // Replace with the actual product image field
            alt={product.name}
            className="w-full h-60 rounded-xl object-cover bg-gray-100"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-2 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 flex-1">{product.name} this a vety long title adamns</h3>
          <p className="text-lg font-bold text-gray-900 whitespace-nowrap">₹{product.price}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

     
      </div>
    </div>
  );


};

export default BestSellerCard;
