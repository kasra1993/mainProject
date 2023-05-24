import { Fragment, useEffect, useRef, useState } from "react";
import Axios from "axios";
import classes from "./NewAdminCategory.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/category-slice";

const NewAdminCategory = (props) => {
  const { item, showButton, categories } = props;
  let id = item.id;
  const Categories = useSelector(
    (state) => state.categoryReducer.categoryItems
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    setTitle(item.title);
    setMeta(item.metaTitle);
    setContent(item.content);
  }, [item]);

  const titleRef = useRef();
  const metaTitleRef = useRef();
  const contentRef = useRef();

  ///////// UPDATE //////////

  const updateHandler = () => {
    const title = titleRef.current.value;
    const metaTitle = metaTitleRef.current.value;
    const content = contentRef.current.value;

    Axios.put(`http://localhost:5000/UpdateCategory/${id}`, {
      title: title,
      metaTitle: metaTitle,
      content: content,
    });
    const newCategories = categories.map((category) => {
      if (category.id === id) {
        return {
          ...category,
          title: title,
          metaTitle: metaTitle,
          content: content,
        };
      }
      return category;
    });
    console.log("this is new Categories");
    console.log(newCategories);
    dispatch(
      categoryActions.getCategory({
        categoryItems: newCategories,
      })
    );
  };
  ///////////////POST NEW CATEGORY
  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const metaTitle = metaTitleRef.current.value;
    const content = contentRef.current.value;
    console.log(title + metaTitle + content);
    Axios.post("http://localhost:5000/CreateNewCategory", {
      title: title,
      metaTitle: metaTitle,
      content: content,
    }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        dispatch(categoryActions.getLoad());
        setTitle("");
        setMeta("");
        setContent("");
      }
    });
  };

  return (
    <Fragment>
      <div className={classes.app}>
        <form action="">
          <label htmlFor="">Title</label>
          <input
            type="text"
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">metaTitle</label>
          <input
            type="text"
            ref={metaTitleRef}
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
          />
          <label htmlFor="">content</label>
          <input
            type="text"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {showButton ? (
            <button className={classes.btn} onClick={updateHandler}>
              Update
            </button>
          ) : (
            <button
              className={classes.btn}
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </Fragment>
  );
};
export default NewAdminCategory;
