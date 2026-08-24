import { configureStore } from "@reduxjs/toolkit";
import vegetablesReducer from "./slices/vegetablesSlice";
import cartReducer from "./slices/cartSlice";


export const store = configureStore({
  reducer: {
    vegetables: vegetablesReducer,
    cart: cartReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;