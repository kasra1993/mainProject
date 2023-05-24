import { Fragment } from "react";
import classes from "./NewsItem.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const NewsItem = (props) => {
  return (
    <Fragment>
      <div className={classes.box}>
        <div className={classes.item}>{props.title}</div>
        <div className={classes.item}>{props.description}</div>
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
export default NewsItem;
