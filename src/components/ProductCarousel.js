"use client"; // Ensures client-side rendering

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ProductCarousel = ({ products }) => {
    return (
        <section className="my-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <Swiper
                    effect="coverflow" // Enable the coverflow effect
                    grabCursor={true} // Allow grabbing for navigation
                    centeredSlides={true} // Center active slide
                    slidesPerView="auto" // Adjust to slide size
                    coverflowEffect={{
                        rotate: 0, // No rotation
                        stretch: 0, // No stretching
                        depth: 200, // Depth effect for 3D
                        modifier: 1, // Modifier for effect strength
                        slideShadows: true, // Enable shadows
                    }}
                    pagination={{
                        clickable: true, // Make pagination bullets clickable
                    }}
                    autoplay={{
                        delay: 3000, // Automatically slide every 3 seconds
                    }}
                    loop={true} // Loop through slides infinitely
                    modules={[EffectCoverflow, Pagination, Autoplay]} // Enable modules
                    className="mySwiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="product-card">
                                <img className="h-32" src={product.image} alt={product.name} />
                                <div className="details">
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ProductCarousel;
