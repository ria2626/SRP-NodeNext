"use client";
import React from "react";
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
interface Listing {
  title: string;
  description: string;
  price: string;
  location: string;
  images: string[];
}
interface Category {
  _id: string;
  name: string;
}
const ListingForm = ({ fetchListings }: { fetchListings: () => void }) => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState<Omit<Listing, "images">>({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Adding to db...");
    try {
      if (!selectedFiles || selectedFiles.length === 0) {
        alert("Please select at least one file.");
        return;
      }
      const form = e.target as HTMLFormElement;
      const imageFormData = new FormData(form);
      for (let i = 0; i < selectedFiles.length; i++) {
        imageFormData.append("images", selectedFiles[i]);  // Append multiple files
      }
      const uploadResponse = await axios.post("http://localhost:5000/api/upload", imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrls = uploadResponse.data.imageUrls;
      // Send the listing data with image URLs
      const response = await axios.post("http://localhost:5000/api/listings", {
        ...formData,
        images: imageUrls,
        categories: [selectedCategory],
      });
      toast.success("Product saved", {
        id: toastId,
        description: `${formData?.title} has been saved to db.`,
      });
      console.log(response);
      fetchListings();
      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (error) {
      console.error("Error uploading files:", error?.response ? error?.response.data : error);
    }

  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex items-center justify-center pt-30 pb-30">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Product</h2>
          <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl max-w-md mx-auto" method="multipart/form-data">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" required></textarea>
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" required />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" required />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 w-full mb-3"
              required
              name="categories"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input type="file" accept="image/*" multiple onChange={handleFileChange}
              className="border p-2 w-full mb-2" required /><button type="submit"
                className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-4 rounded-lg w-full transition-all">
              Add Product
            </button></form>
        </div>
      </div>
    </>
  );
};

export default ListingForm;