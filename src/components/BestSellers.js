// components/BestSellers.js
import React from 'react';
import BestSellerCard from './BestSellerCard'; // Assuming BestSellerCard is already created

const BestSellers = ({ products }) => {
  return (
    <section className="my-12">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* Best Sellers Marquee */}
        <div className="overflow-hidden">
          <div
            className="flex space-x-4 animate-marquee-container"
            style={{ display: 'flex' }}
          >
            {/* First product list */}
            <div className="flex space-x-4 animate-marquee ">
              {products.map((product) => (
                <div key={product._id} className="flex-shrink-0 h-max w-72">
                <BestSellerCard product={product} />
                </div>
              ))}
            </div>

            {/* Duplicate product list to create the loop effect */}
            <div className="flex space-x-4 animate-marquee">
              {products.map((product) => (
                <div key={product._id} className="flex-shrink-0 h-max w-72">
                  <BestSellerCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;


