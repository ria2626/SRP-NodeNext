import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import cartReducer from './cartSlice';
import authReducer from './authSlice';


export const store = configureStore({
    reducer:{
    product:productReducer,
    cart:cartReducer,
    auth:authReducer
    }
})
store.subscribe (()=>{
    if(typeof window  != 'undefined'){
        const state = store.getState()
        localStorage.setItem('guestCart',JSON.stringify(state.cart.cartItems))
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch