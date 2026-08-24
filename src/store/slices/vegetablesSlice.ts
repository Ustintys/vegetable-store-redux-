import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";
import type {Vegetables} from "../../types.tsx";
import ky from "ky";

type VegetableCatalogState = {
  vegetables: Vegetables[];
  loading: boolean;
  error: string | null;
}

const skeleton = [];  // заглушка
for (let i = 0; i < 8; i++) {
  skeleton.push(
    {
      id: i,
      name: '',
      wieght: '',
      price: 0,
      image: '',
      quantity: 0,
    }
  );
}


const initialState: VegetableCatalogState = {
  vegetables: skeleton,
  loading: true,
  error: null,
}

export const fetchVegetables = createAsyncThunk(
  "vegetableCatalog/fetchVegetables",

  async function() {
      const data = await ky
        .get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
        .json<Vegetables[]>();

      const transformData = data.map((product) => {
        const [name, wieght] = product.name.split(' - ');
        const quantity = 1;
        return { ...product, name, wieght, quantity }
      })

      return transformData
  }

);


const vegetablesSlice = createSlice({
  name: 'vegetableCatalog',

  initialState,

  reducers: {

    decrease(state, action: PayloadAction<number>) {

      const vegetable = state.vegetables.find(
        (vegetable) => vegetable.id === action.payload
      );

      if (vegetable) {
        vegetable.quantity = Math.max(
          1,
          vegetable.quantity - 1
        );
      }
    },

    increase(state, action: PayloadAction<number>) {

      const vegetable = state.vegetables.find(
        (vegetable) => vegetable.id === action.payload
      );

      if (vegetable) {
        vegetable.quantity += 1;
      }
    },

  },

  extraReducers: (builder) => {

    builder.addCase(fetchVegetables.pending, (state) => {
        state.loading = true;
        state.error = null;
      });

    builder.addCase(fetchVegetables.fulfilled, (state, action) => {
        state.loading = false;
        state.vegetables = action.payload;
      });

    builder.addCase(fetchVegetables.rejected, (state) => {
        state.loading = false;
        state.error = "Не удалось загрузить овощи";
      });

  },
})


export const {decrease, increase} = vegetablesSlice.actions;
export default vegetablesSlice.reducer;