import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import { Fragment } from "react";
import classes from "./AdminHome.module.css";
import React from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductData,
  fetchCategories,
  getSubCategories,
  fetchBrands,
  fetchNews,
  fetchOffers,
} from "../../store/actions";
import { useEffect } from "react";

const AdminHome = () => {
  const loadAfterNewCategoryCreation = useSelector(
    (state) => state.categoryReducer.loadCategories
  );
  const brandLoad = useSelector((state) => state.brandReducer.load);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchCategories());
    dispatch(getSubCategories());
    dispatch(fetchBrands());
    dispatch(fetchNews());
    dispatch(fetchOffers());
  }, [dispatch, loadAfterNewCategoryCreation, brandLoad]);

  return (
    <Fragment>
      <Topbar />
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.home}>
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
export default AdminHome;
