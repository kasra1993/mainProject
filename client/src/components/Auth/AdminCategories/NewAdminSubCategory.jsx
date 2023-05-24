import React from "react";
import { Fragment } from "react";
import classes from "./NewAdminSubCategory.module.css";
import Axios from "axios";
import { useRef, useState } from "react";

const NewAdminSubCategory = () => {
  const [name, setName] = useState("");
  const [category_id, setCategory_id] = useState();
  const nameRef = useRef();
  const category_idRef = useRef();

  ////////////////////////// POST NEW SUB CATEGORY ///////////////////////////////
  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const category_id = category_idRef.current.value;
    console.log(name + category_id);
    Axios.post("http://localhost:5000/createNewSubCategory", {
      name: name,
      category_id: category_id,
    }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        // dispatch(categoryActions.getLoad());
        setCategory_id("");
        setName("");
      }
    });
  };

  return (
    <Fragment>
      <div className={classes.app}>
        <form action="">
          <label htmlFor="">Name</label>
          <input
            type="text"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Category_id</label>
          <input
            type="number"
            ref={category_idRef}
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}
          />

          {/* {showButton ? (
            <button className={classes.btn} onClick={updateHandler}>
              Update
            </button>
          ) : ( */}
          <button className={classes.btn} type="submit" onClick={submitHandler}>
            Submit
          </button>
          {/* )} */}
        </form>
      </div>
    </Fragment>
  );
};

export default NewAdminSubCategory;
