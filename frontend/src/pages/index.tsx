import React from "react";
import Image from "next/image";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect} from "react";
import { useRouter } from 'next/router'
import type { AppDispatch, RootState } from '@/store';
import { addToCart ,decrementQty,incrementQty } from '@/store/cartSlice';
import { fetchListingById} from '@/store/productSlice';
import { Toaster, toast } from 'sonner'
import { fetchRelatedProducts } from "@/store/productSlice";
import { fetchCategories } from "@/store/productSlice";
const Home = () => {
  const allCategories = useSelector((state: RootState) => state.product.allCategories);
  console.log(allCategories);
  return (<>
   <section className="hero">
            <h1>Where Elegance Meets You</h1>
            <p>Discover timeless suits, dresses & more crafted just for you.</p>
            <a href="/shop-now" className="btn-gold">Shop Now</a>
          </section>

  <section className="categories">

    <div className="category-card">
         <Image src='/images/kurtiset.jpg' alt="kurti" width={400} height={500} />
      <h3>Kurti Sets</h3>
    </div>

    <div className="category-card">
         <Image src='/images/dress.jpg' alt="dress" width={400} height={500} />
      <h3>Dresses</h3>
    </div>
    <div className="category-card">
         <Image src='/images/top.jpeg' alt="tops" width={400} height={500} />
      <h3>Tops and Tunics</h3>
    </div>
    
  </section><section className="about" id="about">
    <h2>About AuraAttire</h2>
    <p>
      AuraAttire is dedicated to bringing you the finest women's wear crafted with care and elegance. From chic suits to stunning dresses, our collections are designed to empower and inspire confidence for every occasion.
    </p>
  </section>
          </>
  );
};

export default Home;
