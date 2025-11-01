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
    <header className="p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
    <svg width="160" height="40" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AuraAttire logo">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" >
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#D4AF37" flood-opacity="0.8"/>
        </filter>
      </defs>
      <circle cx="50" cy="40" r="20" fill="none" stroke="#D4AF37" stroke-width="3" filter="url(#glow)" />
      <text x="30" y="60" font-family="Georgia, serif" font-weight="700" font-size="50" fill="#2C6E49" letter-spacing="2">A</text>
      <text x="80" y="55" font-family="'Dancing Script', cursive" font-size="45" fill="#2C6E49" font-weight="400" letter-spacing="1">
        ura
      </text>
      <text x="160" y="55" font-family="Georgia, serif" font-weight="600" font-size="40" fill="#D4AF37" letter-spacing="2">
        Attire
      </text>
    </svg>
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
                className="btn-gold text-white rounded relative p-2"
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
