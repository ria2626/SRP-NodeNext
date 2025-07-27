"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

interface Listing {
  images: [];
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
}

const ListingList: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const fetchListings = async () => {
    try {
      const response = await axios.get<Listing[]>("http://localhost:5000/api/listings");
      console.log(response.data);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
   
    fetchListings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Available Rentals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {listings.map((listing) => (
  <div className="block" key={listing._id}>   
    {listing?.images?.length > 0 ? (
      <div className="grid grid-cols-3 gap-4">
         <a key={listing._id} href={`/listings/${listing._id}`}>
        {listing.images.map((image, index) => (
          <img 
            key={index} // Adding unique key
            src={`http://localhost:5000${image}`}
            className="w-40 h-20 object-cover rounded-lg"
          />
        ))}
        </a>
      </div>
    ) : (
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg mb-2">
        <span className="text-gray-600">No Image Available</span>
      </div>
    )}
            <div key={listing._id} className="bg-white shadow-lg p-4 rounded-lg">
            <h3 className="text-xl font-bold">{listing.title}</h3>
            <p className="text-gray-600">{listing.description}</p>
            <p className="text-blue-500 font-bold">${listing.price}</p>
            <p className="text-sm text-gray-500">{listing.location}</p>
          </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingList;
    