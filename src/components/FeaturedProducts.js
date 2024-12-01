'use client'
import React , {useState , useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MiniProductCard from "./MiniProductCard.js";

const FeaturedProducts = ({ featuredProducts }) => {
    const quotes = [
      {
        text: "I always say shopping is cheaper than a psychiatrist.",
        author: "Tammy Faye Bakker"
      },
      {
        text: 'Shopping is therapy. Just like exercise, but with better results.',
        author: 'Unknown'
      },
      {
        text: 'Money can’t buy happiness, but it can buy a lot of shoes.',
        author: 'Imelda Marcos'
      },
      {
        text: "Money can’t buy happiness, but shopping can.",
        author: "Unknown"
      },
      {
        text: 'Shopping is my cardio.',
        author: 'Carrie Bradshaw'
      }
    ];
    
  
    const [randomQuote, setRandomQuote] = useState(null);
  
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    }, []); 
  
  
  return (
    <section className="bg-white rounded-xl shadow-lg border ">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:space-x-4 justify-between items-center">

        {/* First Div: Swiper Carousel */}
        <div className="w-full lg:w-3/5 relative mb-8 lg:mb-0">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            
            loop={true}
            autoplay={{
              delay: 4000,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product._id} className="relative">
                <div
                  className="w-full h-[500px] bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${product.images[1]})`,
                  }}
                ></div>

                {/* Overlay Product Card */}
                <div className="absolute bottom-2 left-2 transform  bg-white bg-opacity-90 shadow-lg rounded-lg w-80 text-center">
                  <MiniProductCard
                    name={product.name}
                    description={product.description}
                    price={`$${product.price}`}
                    _id={product._id}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

         {/* Second Div: Quote */}
         <div className="flex flex-col h-[100%]  w-full lg:w-2/5 text-center lg:text-left">
          {randomQuote ? (
            <>
              <h2 className="text-6xl h-1/2 items-start font-mono font-semibold text-gray-800">{`"${randomQuote.text}"`}</h2>
              <p className="text-end">- {randomQuote.author}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      

      </div>
    </section>
  );
};

export default FeaturedProducts;
