import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export interface Product {
    location: string;
    title: string;
    _id:string,
    name:string,
    price:number,
    description:string,
    images?:string,
    categories:[]
}
interface Category {
  _id: string;
  name: string;
  icon?: string;
}
interface ProductState{
    [x: string]: unknown;
    items:Product[],
    currentProduct:Product | null,
    loading:boolean,
    allCategories: Category[]
}

const initialState: ProductState = {
    items:[],
    currentProduct:null,
    loading:false,
    relatedProducts: [],
    allCategories:[]
}
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters?: {
      categories?: string[];
      priceMin?: string;
      priceMax?: string;
      colors?: string[];
    }) => {
      const params = new URLSearchParams();
      if (filters?.categories && filters.categories.length > 0) {
        filters.categories.forEach((cat) => params.append('category', cat));
      }
  
      if (filters?.colors && filters.colors.length > 0) {
        filters.colors.forEach((color) => params.append('color', color));
      }
  
      if (filters?.priceMin) params.append('priceMin', filters.priceMin);
      if (filters?.priceMax) params.append('priceMax', filters.priceMax);
  
      const res = await axios.get<Product[]>(`http://localhost:5000/api/listings?${params.toString()}`);
      console.log(res);
      return res.data;
    }
  );


export const fetchListingById = createAsyncThunk(
  "products/fetchListingById",
  async (id: string) => {
    const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
    return res.data;
  }
);
export const fetchRelatedProducts = createAsyncThunk(
  'product/fetchRelatedProducts',
  async ({ categoryId, excludeId }: { categoryId: string; excludeId: string }) => {
    const res = await fetch(
      `http://localhost:5000/api/listings/related/${categoryId}/${excludeId}`
    );
    return await res.json();
  }
);
export const fetchCategories = createAsyncThunk(
 'products/fetchCategories',
  async () => {
    const res = await fetch(
      `http://localhost:5000/api/categories`
    );
    return await res.json();
  }
);
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      // If you want to add manual reducers later
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })  
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.loading = false;
        })
        .addCase(fetchListingById.pending, (state) => {
          state.loading = true;
        })  
        .addCase(fetchListingById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentProduct = action.payload;
        })
        .addCase(fetchListingById.rejected, (state) => {
          state.loading = false;
        })
        .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
          state.relatedProducts = action.payload;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.allCategories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          console.error('Failed to fetch categories:', action.error);
        });
    },
  });


 
export default productSlice.reducer