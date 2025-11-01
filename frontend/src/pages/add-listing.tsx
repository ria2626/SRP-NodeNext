import React from "react";
import ListingForm from "../components/listingForm";

const AddListing = () => {
  return (
    <div className="p-6 bg-gray-200">
      <ListingForm fetchListings={() => {}} />
    </div>
  );
};
export default AddListing;
