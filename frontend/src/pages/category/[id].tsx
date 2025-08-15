import React from "react";
// import Image from "next/image";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect} from "react";
import { useRouter } from 'next/router'
import type { AppDispatch, RootState } from '@/store';
// import { addToCart ,decrementQty,incrementQty } from '@/store/cartSlice';
import { fetchListingById} from '@/store/productSlice';
// import { Toaster, toast } from 'sonner'
import { fetchRelatedProducts } from "@/store/productSlice";
import { fetchCategories } from "@/store/productSlice";


export default function CatgeoryDetail() {
  const router = useRouter()
  const { id } = router.query      // id will be the filename param
  const dispatch: AppDispatch = useDispatch();
  const { currentProduct, loading} = useSelector((state: RootState) => state.product);

//   const cartItems = useSelector((state: RootState) => state.cart.cartItems);
//   const itemInCart = cartItems.find((item) => item._id === currentProduct?._id);

  useEffect(() => {
    if (id) {
      dispatch(fetchListingById(id as string));
      dispatch(fetchCategories());
    }
  }, [id, dispatch]);
  
  useEffect(() => {
    if (currentProduct && currentProduct.categories?.[0]?._id) {
      console.log(
        'Fetching related products for category:',
        currentProduct.categories[0]._id
      );
      dispatch(
        fetchRelatedProducts({
          categoryId: currentProduct.categories[0]._id,
          excludeId: currentProduct._id,
        })
      );
    } else {
      console.log('No category found yet, skipping fetch.');
    }
  }, [currentProduct, dispatch]);
 
  
  if (loading || !currentProduct?._id) return (<div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>);

  return (
  
    <>
    <div className="p-8">
      <p>wqeqweqw</p>
      </div>
 </>
  
  );
  
};




