import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Vegetables} from "../../types.tsx";

type CartState = {
  items: Vegetables[];
}

const initialState: CartState = {
  items: [],
}


const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    addToCart(state, action: PayloadAction<Vegetables>) {

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;

      } else {
        state.items.push(action.payload);
      }
    },

    increaseQuantity(state, action: PayloadAction<number>) {

          state.items.forEach((vegetable) => {
            if(vegetable.id === action.payload){
               vegetable.quantity = vegetable.quantity + 1
            }
          });
    },

    decreaseQuantity(state, action: PayloadAction<number>) {

      const index = state.items.findIndex(
        (vegetable) => vegetable.id === action.payload
      );

      if (index === -1) return;
      state.items[index].quantity -= 1;

      if (state.items[index].quantity <= 0) {
        state.items.splice(index, 1);
      }
    },

  },
});

export const {addToCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;