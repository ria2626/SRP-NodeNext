"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { incrementQty, decrementQty, removeFromCart } from "@/store/cartSlice";
export default function SideCart({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-black">Your Cart</h2>
        <button
  onClick={onClose}
  className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 group"
  aria-label="Close cart"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
</button>

      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
        {cartItems.map(item => (
          <div key={item._id} className="border p-3 rounded flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="font-medium text-black">{item.title}</h3>
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <p className="text-gray-600">${item.price}</p>
            <div className="inline-flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => dispatch(decrementQty(item._id))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-black"
              >
                −
              </button>
              <span className="px-4 py-2 text-black">{item.quantity}</span>
              <button
                onClick={() => dispatch(incrementQty(item._id))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-black"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <h2 className="text-xl font-semibold text-black">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
      <div className="p-4 border-t">
        <button
          onClick={onClose}
          className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>

     
    </div>
  );
}
