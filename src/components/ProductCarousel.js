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
                    effect="coverflow" 
                    grabCursor={true}
                    centeredSlides={true} 
                    slidesPerView="auto" 
                    coverflowEffect={{
                        rotate: 0, 
                        stretch: 0,
                        depth: 200, 
                        modifier: 1, 
                        slideShadows: true,
                    }}
                    pagination={{
                        clickable: true, 
                    }}
                    autoplay={{
                        delay: 3000,
                    }}
                    loop={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]} 
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
