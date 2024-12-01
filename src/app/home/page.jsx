import Link from "next/link";
import axios from "axios";
import ProductCard from "../../components/ProductCard.js";
import FeaturedProducts from '../../components/FeaturedProducts.js';
import PopularCategories from "@/components/PopularCategories.js";
import BestSellers from "@/components/BestSellers.js";
import WhyUs from "@/components/WhyUs.js";


// Fetch products
const fetchProducts = async () => {
  const response = await axios.get(
    "https://e-commerce-backend-gper.onrender.com/api/product/getProducts?limit=Infinity"
  );
  return response.data.products;
};

// Fetch categories
const fetchCategories = async () => {
  const response = await axios.get("https://e-commerce-backend-gper.onrender.com/api/product/categories");
  return response.data;
};

const HomePage = async () => {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  // Select the first 10 products for the carousel (or any subset you want)
  const featuredProducts = products.slice(0, 3);

  const categoryData = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/11438/11438126.png",
      categoryName: 'Sports'
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/868/868225.png",
      categoryName: 'Electronics'
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/12585/12585062.png",
      categoryName: 'Beauty'
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/2544/2544087.png",
      categoryName: 'Home'
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/1198/1198307.png",
      categoryName: 'Fashion'
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/852/852907.png",
      categoryName: 'Toys'
    }
  ]

  const data = [
    {
      icon: "https://cdn-icons-png.freepik.com/512/10108/10108414.png", 
      title: "Secure Shopping Experience 🔒",
      description: "Your security is our priority. Our website is equipped with the latest encryption technology, ensuring that your personal and payment information is always secure while shopping with us."
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/5619/5619346.png",
      title: "Authentic & High-Quality Items 🏅",
      description: "We only source products from trusted suppliers and ensure each item meets our high-quality standards. Our team is constantly reviewing and testing products to guarantee they live up to their promise of performance and value."
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/2795/2795331.png", 
      title: "Fast & Reliable Delivery 🚚",
      description: "Enjoy fast and reliable shipping, no matter where you are. We partner with the best delivery services to ensure that your order arrives on time, every time. You can also track your order status in real-time through our website."
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/11153/11153370.png",
      title: "Easy Returns & Exchanges 🔄",
      description: "Shopping online should be hassle-free. That’s why we offer an easy and straightforward return and exchange policy."
    },
  ];


  return (
    <div className="bg-bgClr flex flex-col space-y-4 p-2  lg:p-6">

      <FeaturedProducts featuredProducts={featuredProducts} />

      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-semibold">Popular categories</h1>
        <PopularCategories categoryData={categoryData} />
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-semibold">Best sellers</h1>
        <BestSellers products={products} />
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-semibold">Why Us ?</h1>
        <WhyUs data={data} />
      </div>


    </div>
  );
};

export default HomePage;
