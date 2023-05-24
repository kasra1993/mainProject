import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import ProductDetails from "./components/Products/ProductDetails";
import NotFound from "./pages/NotFound";
import Products from "./components/Products/Products";
import AdminHome from "./components/Auth/AdminHome";
import store from "./store/index";
import AdminProducts from "./components/Auth/AdminProducts/AdminProducts";
import AdminCategories from "./components/Auth/AdminCategories/AdminCategories";
import AdminComments from "./components/Auth/AdminComments/AdminComments";
import AdminNews from "./components/Auth/AdminNews/AdminNews";
import AdminOffers from "./components/Auth/AdminOffers/AdminOffers";
import AdminUsers from "./components/Auth/AdminUsers/AdminUsers";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import AdminBrands from "./components/Auth/AdminBrands/AdminBrands";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Login" element={<Login />} />
        <Route path="AdminHome" element={<AdminHome />}>
          <Route path="AdminProducts" element={<AdminProducts />} />
          <Route path="AdminCategories" element={<AdminCategories />} />
          <Route path="AdminBrands" element={<AdminBrands />} />
          <Route path="AdminComments" element={<AdminComments />} />
          <Route path="AdminNews" element={<AdminNews />} />
          <Route path="AdminOffers" element={<AdminOffers />} />
          <Route path="AdminUsers" element={<AdminUsers />} />
        </Route>
        <Route />
        <Route path="Products" element={<Products />} />
        <Route path="/Products/:productid" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
