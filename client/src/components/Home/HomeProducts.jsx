import React from "react";
import classes from "./HomeProducts.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";
import { Link } from "react-router-dom";

const HomeProducts = (props) => {
  const { title, description, price, discount_id, category_id, id } = props;
  const dispatch = useDispatch();
  const addHandler = () => {
    dispatch(
      cartAction.additem({
        id,
        price,
        title,
      })
    );
  };
  return (
    <div className={classes.box}>
      <h1>{title}</h1>

      <h3>{discount_id}</h3>
      <h3>{category_id}</h3>

      <h2>{price}</h2>

      <h3>{description}</h3>
      <button onClick={addHandler} className={classes.btn}>
        Add to Cart
      </button>
      <Link to={`/products/${id}`}>
        <button className={classes.btn}>Learn more</button>
      </Link>
    </div>
  );
};

export default HomeProducts;
