import { NavLink } from "react-router-dom";
import React from "react";
import CartButton from "../Cart/CartButton";

const MainNavigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="#">
            Online shop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/AdminHome" className="nav-link">
                  Admin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Products" className="nav-link">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Products/:productid"
                  className="nav-link"
                ></NavLink>
              </li>
              <li className="nav-item">
                <CartButton />
              </li>
            </ul>
            <div className="buttons">
              <a href="" className="btn btn-outline-dark">
                <i className="fa fa-sign-in me-1"></i>Login
              </a>

              <a href="" className="btn btn-outline-dark ms-3">
                <i className="fa fa-user-plus me-1"> </i>Sign Up
              </a>
            </div>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default MainNavigation;
