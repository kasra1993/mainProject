import { createSlice } from "@reduxjs/toolkit";
const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    newsWithImage: [],
    newsItem: {},
    newUpdatedNews: {},
    comments: [],
  },
  reducers: {
    getNews(state, action) {
      state.news = action.payload.news;
    },
    getSingleNews(state, action) {
      state.newsItem = action.payload.newsItem[0];
    },
    addToUpdateInfo(state, action) {
      state.productUpdateInfo = action.payload.productUpdateInfo;
    },

    getProductWithImages(state, action) {
      state.productsWithImages = action.payload.productsWithImages;
    },
  },
});
export default newsSlice;
export const newsActions = newsSlice.actions;
