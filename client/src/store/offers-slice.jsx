import { createSlice } from "@reduxjs/toolkit";
const OffersNews = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    offersWithImage: [],
    newOffer: {},
    newUpdatedOffer: {},
  },
  reducers: {
    getOffers(state, action) {
      state.offers = action.payload.offers;
    },
    getSingleNews(state, action) {
      state.newOffer = action.payload.newOffer[0];
    },
    addToUpdateInfo(state, action) {
      state.productUpdateInfo = action.payload.productUpdateInfo;
    },

    getOffersWithImage(state, action) {
      state.productsWithImages = action.payload.productsWithImages;
    },
  },
});
export default OffersNews;
export const offersActions = OffersNews.actions;
