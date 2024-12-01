'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const MiniProductCard = ({ name, price, _id, description }) => {
  const [userId, setUserId] = useState(null);

  const verifyUser = async () => {
    try {
      const { data } = await axios.get('https://e-commerce-backend-gper.onrender.com/api/auth/verify', { withCredentials: true });
      setUserId(data.id);
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div className="w-full flex flex-col space-y-3 items-start bg-white p-4 rounded-lg shadow-lg ">
    <div className='flex justify-between w-full items-center space-x-4'>

      {/* Product Title */}
      <Link href={userId ? `/productDetails/${userId}/${_id}` : "#"} passHref>
        <h3 className="text-xl font-semibold text-gray-900 hover:text-gray-700 cursor-pointer truncate">{name}</h3>
      </Link>

      {/* Price */}
      <p className="text-lg font-bold text-gray-800 ">{price}</p>
    </div>

      {/* Description */}
      <p className="text-sm text-gray-600 text-start  line-clamp-2 ">{description}</p>

    
    </div>
  );
};

export default MiniProductCard;
