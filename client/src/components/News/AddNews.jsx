import { Fragment, useRef } from "react";
import Axios from "axios";
import classes from "./AddNews.module.css";
import React from "react";

const AddNews = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    Axios.post("http://localhost:5000/createNews", {
      title: title,
      description: description,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <Fragment>
      <div className={classes.app}>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="">Title</label>
          <input type="text" ref={titleRef} />

          <label htmlFor="">Description</label>
          <input type="text" ref={descriptionRef} />

          <button className={classes.btn}>Submit</button>
        </form>
      </div>
    </Fragment>
  );
};
export default AddNews;
