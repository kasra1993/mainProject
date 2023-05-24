import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    isChanged: false,
    cartIsVisible: false,
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    additem(state, action) {
      const newitem = action.payload;
      const existingItem = state.items.find((item) => item.id === newitem.id);
      state.totalQuantity++;
      state.isChanged = true;
      if (!existingItem) {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalprice: newitem.price,
          name: newitem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalprice = existingItem.totalprice + newitem.price;
      }
    },
    removeitem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.isChanged = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalprice = existingItem.totalprice - existingItem.price;
      }
    },
  },
});

export default cartSlice;
export const cartAction = cartSlice.actions;
