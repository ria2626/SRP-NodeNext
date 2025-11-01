'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This runs only on client
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // avoid rendering on server
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.name} - ${item.price} × {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
