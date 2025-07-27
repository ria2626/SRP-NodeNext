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

interface Product {
  _id: string;
  title: string;
  price: number;
  description:string,
  location: string;
  images: string[];
  categories:string[];
  allCategories: { _id: string; name: string }[];
}

export default function ListingDetail() {
  const router = useRouter()
  const { id } = router.query      // id will be the filename param
  const dispatch: AppDispatch = useDispatch();
  const { currentProduct, loading ,relatedProducts} = useSelector((state: RootState) => state.product);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const itemInCart = cartItems.find((item) => item._id === currentProduct?._id);

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
  const handleAddToCart = async (product:Product) =>{
    dispatch(addToCart(product))
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
  
  if (loading || !currentProduct?._id) return (<div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>);


  //   <div className="p-6 max-w-xl">
  //     <h2 className="text-3xl font-bold mb-4">Edit Listing</h2>
  //     {currentProduct?.images.length > 0 && (
  //       <div className="mb-4">
  //         {currentProduct?.images.map((img, index) => (
  //           <img
  //             key={index}
  //             src={`http://localhost:5000${img}`} 
  //             alt="Listing"
  //             className="w-full h-48 object-cover rounded-lg mb-2"
  //           />
  //         ))}
  //       </div>
  //     )}

  //     <input
  //       type="text"
  //       name="name"
  //       value={form.title}
  //       onChange={handleInputChange}
  //       className="border p-2 w-full mb-2"
  //     />
     
  //     <input
  //       type="number"
  //       name="price"
  //       value={form.price}
  //      onChange={handleInputChange}
  //       className="border p-2 w-full mb-2"
  //     />
  //     <input
  //       type="text"
  //       name="location"
  //       value={form.location}
  //      onChange={handleInputChange}
  //       className="border p-2 w-full mb-2"
  //     />

  //     <button
  //       className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  //      onClick={handleUpdate}
  //     >
  //       Update Listing
  //     </button>
  //   </div>
  // );

  return (
    <><div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {currentProduct?.images?.[0] ? (
          <Image src={`http://localhost:5000${currentProduct?.images?.[0]}`}
            alt={`Slide`}
            width={400}
            height={500} 
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"/>
        ) : (
          <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
            No image
          </div>
        )}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">{currentProduct?.title}</h1>
          <p className="text-[20px] mb-6 font-bold">${currentProduct?.price + '' + '.00'}</p>
          <p className="text-black-700  mb-6 text-[18px]">
            {currentProduct?.description}

          </p>
          {itemInCart ? (
            <div className="inline-flex items-center border border-gray-300 rounded overflow-hidden mb-4 w-28">
              <button
                onClick={() => dispatch(decrementQty(currentProduct?._id))}
                className="px-3 py-2 text-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                −
              </button>
              <span className="px-4 py-2 text-lg bg-white">{itemInCart.quantity}</span>
              <button
                onClick={() => dispatch(incrementQty(currentProduct?._id))}
                className="px-3 py-2 text-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                +
              </button>
            </div>

          ) : (
            <button
              onClick={() => handleAddToCart(currentProduct)}
              className="bg-lime-600 w-50 mb-8 text-white px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              Add to Cart
            </button>
          )}
          <div className="flex flex-col justify-start">
            <h1 className="text-[10px] font-bold text-gray">Category</h1>
            <p className="text-[12px] text-gray-400 font-bold">{currentProduct?.categories?.[0]?.name}</p>
          </div>

        </div>

      </div>
      <Toaster position="top-right" richColors />
    </div><div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4"
            >
              <Image
                src={`http://localhost:5000${product.images?.[0]}`}
                alt={product.title}
                width={300}
                height={300}
                className="rounded object-cover" />
              <h3 className="font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">${currentProduct?.price + '' + '.00'}</p>
              <button
                onClick={() => router.push(`/listings/${product._id}`)}
                className="bg-lime-600 w-50 mb-8 text-white px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-lime-400"
              >
                View
              </button>
              {/* <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer ml-auto" /> */}

            </div>
            
          ))}
        </div>
  
      </div></>
  
  );
  
};




