import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarwrapper}>
        <div className={classes.sidebarmenu}>
          <h3 className={classes.sidebartitle}>Dashboard</h3>
          <ul className={classes.sidebarlist}>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminProducts">Products</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminCategories">Categories</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminOffers">Offers</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminNews">News</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminComments">Comments</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminBrands">Brands</NavLink>
            </li>
            <li className={classes.sidebarlistitem}>
              <NavLink to="/AdminHome/AdminUsers">Users</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.sidebarmenu}>
          <h3 className={classes.sidebartitle}>Notifications</h3>
          <ul className={classes.sidebarlist}>
            <li className={classes.sidebarlistitem}>Messages</li>
            <li className={classes.sidebarlistitem}>Setting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
