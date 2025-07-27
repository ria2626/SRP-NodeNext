/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {  useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,fetchCategories } from '@/store/productSlice';
import type { AppDispatch, RootState } from '@/store';
import { addToCart ,decrementQty,incrementQty } from '@/store/cartSlice';
import { Toaster, toast } from 'sonner'
import { ProductImageCarousel } from '@/components/ProductImageCarousel';
import FullPageLoader from '@/components/FullPageLoader';

import Link from 'next/link';
type Product = {
  title: string;
  _id: string;
  price: number;
};

export default function GetProducts() {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const allCategories = useSelector((state: RootState) => state.product.allCategories);
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSelectedCategories((prev) =>
    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
  );
};

const applyFilters = async () => {
  const filters = {
    categories: selectedCategories,
    priceMin,
    priceMax,
  };

  setLoading(true);
  try {
    // Wait for the dispatch to finish
    await dispatch(fetchProducts(filters)).unwrap();
  } catch (error) {
    console.error("Error applying filters:", error);
  } finally {
    setLoading(false);
  }
};

  const handleAddToCart = async (product:Product) =>{
    const toastId = toast.loading("Adding to cart...");
    try {
      await new Promise((res) => setTimeout(res, 800));
      dispatch(addToCart(product));
      toast.success("Product added to cart!", {
        id: toastId,
        description: `${product.title} has been added.`,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  }


  const increaseQnty = async (product:Product) =>{
    dispatch(incrementQty(product._id))
    const toastId = toast.loading("Adding to cart...");
    try {
      await new Promise((res) => setTimeout(res, 800));
    
      toast.success("Product added to cart!", {
        id: toastId,
        description: `${product.title} has been added.`,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  }
  const decreaseQnty = async (product:Product) =>{
    dispatch(decrementQty(product._id));
    const toastId = toast.loading("Removing from cart...");
    try {
      
      await new Promise((res) => setTimeout(res, 800));
     
      toast.success("Product removed from cart!", {
        id: toastId,
        description: `${product.title} has been removed.`,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  }
  useEffect(() => {
    setIsHydrated(true);
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!isHydrated) return (
  <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>)
  ; 
  return (
    <>
    {loading && <FullPageLoader/>}
    <div className="flex">
    {/* Sidebar Filters */}
    <div className="w-64 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
  
      {/* Category Filter */}
      { allCategories.length > 0 && (
       
      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        {allCategories.map((category) => (
          
          <div key={category?._id} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={category._id}
              value={category._id}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category._id)}
              className="mr-2"
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
      </div>
      
      )}
  
      {/* Price Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="border p-1 w-20"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="border p-1 w-20"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={applyFilters}
        className="w-full bg-lime-600 text-white py-2 mt-4 rounded"
      >
        Apply Filters
      </button>
    </div>
  
    {/* Product Grid */}
    <div className="flex-1 pl-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Toaster position="top-right" richColors />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p: any) => {
          const itemInCart = cartItems.find((item) => item._id === p._id);
          return (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow p-1 m-2"
            >
              <ProductImageCarousel images={p.images} />
              <div className="p-3">
                <Link href={`/listings/${p._id}`}>
                <h3 className="font-semibold mt-2 line-clamp-2 h-[3.25rem] text-xl font-semibold mb-2 mt-10">
                    {p.title}
                  </h3>
                </Link>
                <p className="text-gray-600 font-bold mb-5">
                  ${p.price + ".00"}
                </p>
                <div className="flex flex-col justify-start">
                  <p className="text-[12px] text-gray-400 font-bold">
                    {p?.categories?.[0]?.name}
                  </p>
                </div>
  
                {itemInCart ? (
                  <div className="inline-flex items-center border border-gray-300 rounded overflow-hidden mt-5 w-28">
                    <button
                      onClick={() => decreaseQnty(p)}
                      className="px-3 py-2 text-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-lg bg-white font-bold">
                      {itemInCart?.quantity}
                    </span>
                    <button
                      onClick={() => increaseQnty(p)}
                      className="px-3 py-2 text-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="bg-lime-600 mt-5 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  </>
     );
}
