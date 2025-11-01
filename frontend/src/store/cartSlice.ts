import { createSlice } from "@reduxjs/toolkit";
 interface cartState {
  cartItems: any[];
}
const storedCart = typeof window != 'undefined' ? localStorage.getItem('guestCart') : null;
const initialState:cartState = {
    cartItems: storedCart ? JSON.parse(storedCart) : []
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
    incrementQty: (state, action) => {
        const item = state.cartItems.find((i) => i._id === action.payload);
        if (item) {
          item.quantity += 1;
        }
        
      },
  
      // Decrement quantity or remove if zero
      decrementQty: (state, action) => {
        const item = state.cartItems.find((i) => i._id === action.payload);
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
          }
        }
      },
        addToCart:(state,action) => {
            const existingItem = state.cartItems.find(
                (item) =>item._id == action.payload._id
                )
            if(existingItem){
                existingItem.quantity += 1; 
            }else{
                state.cartItems.push({...action.payload,quantity:1})
            }
        },
        removeFromCart: (state, action) => {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload
          );
        },
        clearCart:(state)=>{
            state.cartItems = [];
        }
    }
})

export default cartSlice.reducer
export const { addToCart, incrementQty,decrementQty,removeFromCart}  = cartSlice.actions