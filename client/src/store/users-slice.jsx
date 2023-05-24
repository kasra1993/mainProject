// import React, { useCallback, useEffect, useState } from "react";
// let logoutTimer;

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });
// const calculationRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();
//   const remainingDuration = adjExpirationTime - currentTime;
//   return remainingDuration;
// };
// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem("savedtoken");
//   const storedExpirationTime = localStorage.getItem("expirationTime");
//   const remainingTime = calculationRemainingTime(storedExpirationTime);
//   if (remainingTime <= 0) {
//     localStorage.removeItem("savedtoken");
//     localStorage.removeItem("expirationTime");
//     return null;
//   }
//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };
// export const AuthContextProvider = (props) => {
//   const tokenData = retrieveStoredToken();
//   console.log(tokenData, "this is the token data");
//   let initialState;
//   if (tokenData) {
//     initialState = tokenData.token;
//   }
//   const [token, setToken] = useState(initialState);
//   const userIsLoggedIn = !!token;

//   const logoutHandler = useCallback(() => {
//     setToken(null);
//     localStorage.removeItem("savedtoken");
//     localStorage.removeItem("expirationTime");
//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   }, []);
//   const loginHandler = (token, expirationTime) => {
//     setToken(token);
//     localStorage.setItem("savedtoken", token);
//     localStorage.setItem("expirationTime", expirationTime);
//     const remainingTime = calculationRemainingTime(expirationTime);

//     logoutTimer = setTimeout(logoutHandler, remainingTime);
//   };
//   useEffect(() => {
//     if (tokenData) {
//       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
//     }
//   }, [tokenData, logoutHandler]);
//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { createSlice } from "@reduxjs/toolkit";
// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     products: [],
//     productsWithImages: [],
//     productItem: {},
//     productUpdateInfo: {},
//     isSetForUpdate: false,
//     comments: [],
//   },
//   reducers: {
//     get(state, action) {
//       state.products = action.payload.products;
//     },
//     getProduct(state, action) {
//       state.productItem = action.payload.productItem[0];
//     },
//     addToUpdateInfo(state, action) {
//       state.productUpdateInfo = action.payload.productUpdateInfo;
//     },
//     isSetForUpdate(state) {
//       state.isSetForUpdate = true;
//     },
//     getProductWithImages(state, action) {
//       state.productsWithImages = action.payload.productsWithImages;
//     },
//     getComments(state, action) {
//       state.comments = action.payload.comments;
//     },
//   },
// });
// export default productSlice;
// export const productActions = productSlice.actions;
