import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsWithImages: [],
    productItem: {},
    productUpdateInfo: {},
    isSetForUpdate: false,
    comments: [],
  },
  reducers: {
    get(state, action) {
      state.products = action.payload.products;
    },
    getProduct(state, action) {
      state.productItem = action.payload.productItem[0];
    },
    addToUpdateInfo(state, action) {
      state.productUpdateInfo = action.payload.productUpdateInfo;
    },
    isSetForUpdate(state) {
      state.isSetForUpdate = true;
    },
    getProductWithImages(state, action) {
      state.productsWithImages = action.payload.productsWithImages;
    },
    getComments(state, action) {
      state.comments = action.payload.comments;
    },
  },
});
export default productSlice;
export const productActions = productSlice.actions;
