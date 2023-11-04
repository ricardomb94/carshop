import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/Cartutils";

//Our items will be stored in the local storage so that even if we leave the site the item will be still available in the cart.
//So here we are checking if the item is exist. If it is available we will parse it as a string(local storage just hold strings) in JSON format. Else we want initial state to be an object with an empty array call cartItems
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  //This reducer object will have any fn that have to do with the cart: add to cart, remove etc...
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
