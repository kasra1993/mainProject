import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import cartSlice from "./cart-slice";
import categorySlice from "./category-slice";
import uiSlice from "./ui-slice";
import brandSlice from "./brand-slice";
import newsSlice from "./news-slice";
import offersActions from "./offers-slice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    categoryReducer: categorySlice.reducer,
    uiReducer: uiSlice.reducer,
    brandReducer: brandSlice.reducer,
    newsReducer: newsSlice.reducer,
    offersReducer: offersActions.reducer,
  },
});
export default store;
