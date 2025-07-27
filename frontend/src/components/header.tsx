import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import SideCart from "@/components/SideCart";
import { logout } from "@/store/authSlice"; // Adjust if needed
// export const { clearAuthState, logout } = authSlice.actions;

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const itemscount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
   dispatch(logout());
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-lime-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Rental Marketplace</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/add-listing" className="hover:underline">Add Product</Link>
            </li>

            <li className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="font-medium"
                  >
                    Welcome, {user.name} ▾
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute bg-white text-black right-0 mt-5 py-2 w-40 rounded shadow-lg z-10">
                      <li>
                        <Link
                          href="/my-account"
                          className="block px-4 py-2 hover:bg-lime-600 hover:text-white"
                          onClick={() => setDropdownOpen(false)}
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-lime-600 hover:text-white"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link href="/login" className="hover:underline">Login</Link>
              )}
            </li>

            <li>
              <button
                onClick={() => setCartOpen(true)}
                className="bg-lime-600 text-white rounded relative"
              >
                View Cart
                {itemscount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {itemscount}
                  </span>
                )}
              </button>
              <SideCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
