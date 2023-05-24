import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";
import React from "react";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();
  const addHandler = () => {
    dispatch(
      cartAction.additem({
        title,
        id,
        price,
      })
    );
  };
  const removeHandler = () => {
    dispatch(cartAction.removeitem(id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
