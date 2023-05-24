import { Fragment } from "react";
import classes from "./ProductItem.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const ProductItem = (props) => {
  return (
    <Fragment>
      <div className={classes.box}>
        <div className={classes.item}>{props.title}</div>
        <div className={classes.item}>{props.description}</div>
        <div className={classes.item}>{props.price}</div>
        <div className={classes.item}>{props.categoryid}</div>
        <div className={classes.item}>{props.discount_id}</div>
        <div>
          <DeleteOutlineIcon />
        </div>
        <div>
          <EditIcon />
        </div>
      </div>
    </Fragment>
  );
};
export default ProductItem;
