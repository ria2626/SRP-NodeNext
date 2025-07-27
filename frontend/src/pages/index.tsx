import React from "react"; // ✅ Add this import
import GetProducts from "../components/GetProducts";

const Home = () => {
  return (
    <div className="pt-6">
              <GetProducts />
          </div>
  );
};

export default Home;
