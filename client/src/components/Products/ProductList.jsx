import { Fragment, useEffect, useState } from "react";
import React from "react";
import classes from "./ProductList.module.css";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { productActions } from "../../store/product-slice";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const loadedProducts = useSelector((state) => state.products.products);
  // const [updateItem, setUpdateItem] = useState({});
  // const loadedProduct = useSelector(
  //   (state) => state.products.productUpdateInfo
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(loadedProducts);
  }, [loadedProducts]);
  // if (gotUpdated) {
  //   setProducts(prev => { ...prev , loadedProduct})
  // }

  //////////////// on each product UPDATE BUTTON CLICK

  const productUpdateHandler = (id) => {
    const itemProduct = products.find((product) => product.id === id);
    dispatch(
      productActions.addToUpdateInfo({
        productUpdateInfo: itemProduct,
      })
    );
    dispatch(productActions.isSetForUpdate());
    // setUpdateItem(itemProduct);
  };
  ////////////////////on each product DELETE Button Click

  const productDeleteHandler = (id) => {
    if (products.length) {
      Axios.delete(`http://localhost:5000/DeleteProduct/${id}`);
      const productItems = products.filter((d) => d.id !== id);
      // setProducts(products);
      setProducts(productItems);
    }
  };
  return (
    <Fragment>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>title</th>
            <th>metaTitle</th>
            <th>price</th>
            <th>summary</th>
            <th>discount</th>
            <th>categoryId</th>
            <th>quantity</th>
            <th>shop</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>publishedAt</th>
            <th>startsAt</th>
            <th>endsAt</th>
            <th>content</th>
            <th>ACTIONS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th>{product.title}</th>
              <th>{product.metaTitle}</th>
              <th>{product.price}</th>
              <th>{product.summary}</th>
              <th>{product.discount}</th>
              <th>{product.categoryid}</th>
              <th>{product.quantity}</th>
              <th>{product.shop}</th>
              <th>{product.createdAt.substring(0, 10)}</th>
              <th>{product.updatedAt}</th>
              <th>{product.publishedAt}</th>
              <th>{product.startsAt}</th>
              <th>{product.endsAt}</th>
              <th className={classes.content}>{product.content}</th>
              <th>
                <button
                  onClick={() => {
                    productDeleteHandler(product.id);
                  }}
                >
                  DELETE
                </button>
              </th>
              <th>
                <button
                  onClick={() => {
                    productUpdateHandler(product.id);
                  }}
                >
                  UPDATE
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
export default ProductList;
