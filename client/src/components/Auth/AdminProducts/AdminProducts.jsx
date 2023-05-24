import React from "react";
import NewProduct from "../../Products/NewProduct";
import ProductList from "../../Products/ProductList";
import classes from "./AdminProducts.module.css";

const AdminProducts = () => {
  return (
    <div className={classes.home}>
      <NewProduct />
      <ProductList />
    </div>
  );
};

export default AdminProducts;
