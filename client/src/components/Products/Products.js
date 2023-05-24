import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import MainNavigation from "../Layout/MainNavigation";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCategories, fetchProductsWithImages } from "../../store/actions";
import classes from "./Products.module.css";
import { Skeleton } from "@mui/material";

const Products = () => {
  const [filter, setFilter] = useState();
  console.log(filter, "this is filter");

  const notifications = useSelector((state) => state.uiReducer.notification);
  const categories = useSelector(
    (state) => state.categoryReducer.categoryItems
  );

  const dispatch = useDispatch();

  const loadedProducts = useSelector(
    (state) => state.products.productsWithImages
  );
  console.log(loadedProducts);
  // if (loadedProducts.length) {
  // }
  useEffect(() => {
    dispatch(fetchProductsWithImages());
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    setFilter(loadedProducts);
  }, [loadedProducts]);
  const filterProducts = (catid) => {
    const updatedList = loadedProducts.filter(
      (product) => product.categoryid === catid
    );
    setFilter(updatedList);
  };
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(loadedProducts)}
          >
            ALL
          </button>
          {categories &&
            categories.map((cat) => {
              return (
                <button
                  key={cat.id}
                  className="btn btn-outline-dark me-2"
                  onClick={() => filterProducts(cat.id)}
                >
                  {cat.title}
                </button>
              );
            })}
        </div>
        {filter &&
          filter.map((product) => {
            return (
              <>
                <div key={product.id} className="col-md-3">
                  <div className="card h-100 text-center p-4" key={product.id}>
                    <img
                      src={product.file_src}
                      className="card-img-top"
                      alt={product.title}
                      height="250px"
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">{product.title}</h5>
                      <p className="card-text">{product.summary}</p>
                      <p className="card-text">{product.price}</p>
                      <NavLink
                        to={`/products/${product.id}`}
                        className={classes.itemBtn}
                      >
                        read more
                      </NavLink>
                      {/* <a href="#" className={classes.itemBtn}>
                        add to cart
                      </a> */}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </>
    );
  };
  return (
    <div>
      <MainNavigation />
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">ALL PRODUCTS</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {notifications && notifications.status === "success" ? (
            <ShowProducts />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;
