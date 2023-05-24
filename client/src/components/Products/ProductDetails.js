import MainNavigation from "../Layout/MainNavigation";
import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { getProductItem } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";

const ProductDetails = () => {
  const params = useParams();
  const id = params.productid;
  const notifications = useSelector((state) => state.uiReducer.notification);
  const product = useSelector((state) => state.products.productItem);
  console.log(notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductItem(id));
  }, []);
  // const  content;
  // if (productItemValue) {
  //   content =
  //     productItemValue.length !== 0 &&

  // } else {
  //   content = "";
  // }
  console.log(product);
  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img src="#" alt={product.title} height="400px" width="400px" />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.categoryid}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating
            {/* {product.rating && product.rating.rate} */}
            <i className="fa fa-star "></i>
          </p>
          <h3 className="display-6 fw-bold my-4">{product.price}</h3>
          <p className="lead">{product.summary}</p>
          <button className="btn btn-outline-dark">Add to cart</button>
        </div>
        <div className="col-md-12 bg-black">HELLOOO</div>
      </>
    );
  };
  return (
    <Fragment>
      <MainNavigation />
      <div className="container py-5">
        <div className="row py-4">
          {notifications && notifications.status === "success" ? (
            <ShowProduct />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default ProductDetails;
