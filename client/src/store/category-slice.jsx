import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "categories",
  initialState: { categoryItems: [], loadCategories: false, subCategories: [] },
  reducers: {
    getCategory(state, action) {
      state.categoryItems = action.payload.categories;
    },
    getLoad(state) {
      state.loadCategories = !state.loadCategories;
    },
    getSubCat(state, action) {
      state.subCategories = action.payload.subCategories;
    },
  },
});
export default categorySlice;
export const categoryActions = categorySlice.actions;
