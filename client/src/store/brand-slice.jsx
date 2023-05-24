import { createSlice } from "@reduxjs/toolkit";
const brandSlice = createSlice({
  name: "Brands",
  initialState: { brandItems: [], load: false },
  reducers: {
    getBrands(state, action) {
      state.brandItems = action.payload.brandItems;
    },
    getLoad(state) {
      state.load = !state.load;
    },
  },
});
export default brandSlice;
export const brandActions = brandSlice.actions;
