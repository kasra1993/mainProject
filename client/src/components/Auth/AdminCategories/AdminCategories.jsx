import React, { Fragment, useEffect, useState } from "react";
import classes from "./AdminCategories.module.css";
// import useHttp from "../Hooks/use-http";
import Axios from "axios";
// import { fetchCategories } from "../../store/actions";
import NewAdminCategory from "./NewAdminCategory";
import { useSelector } from "react-redux";
// import { categoryActions } from "../../store/category-slice";
import NewAdminSubCategory from "./NewAdminSubCategory";

const AdminCategories = () => {
  const loadedCategories = useSelector(
    (state) => state.categoryReducer.categoryItems
  );

  const [categories, setCategories] = useState([]);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [item, setItem] = useState({});
  useEffect(() => {
    setCategories(loadedCategories);
  }, [loadedCategories]);
  // const categoryLoad = useSelector(
  //   (state) => state.categoryReducer.loadCategories
  // );
  // const { sendRequest, error, data, status } = useHttp(fetchCategories, true);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (status === "completed") {
  //     setCategories(data);

  //     );
  //   }
  // }, [status]);
  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest, categoryLoad]);

  ////////////////////// DELETE BUTTON HANDLER /////////////////////

  const CategoryDeleteHandler = (id) => {
    Axios.delete(`http://localhost:5000/DeleteCategory/${id}`);
    const Items = categories.filter((d) => d.id !== id);
    setCategories(Items);
  };

  ////////////////////// UPDATE HANDLER FOR BUTTON /////////////////////

  const updateHandler = (id) => {
    setShowUpdateButton(true);
    const newItem = categories.find((item) => item.id === id);
    setItem(newItem);
  };
  return (
    <Fragment>
      <div className={classes.form}>
        <NewAdminCategory
          item={item}
          showButton={showUpdateButton}
          categories={categories}
        />
      </div>
      <h1>Create New Sub Category</h1>
      <div className={classes.form}>
        <NewAdminSubCategory />
      </div>
      <div className={classes.list}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <td className={classes.td}>title</td>
            <td className={classes.td}>metaTitle</td>
            <td className={classes.td}>content</td>
            <td className={classes.td}>Action</td>
            <td className={classes.td}>Action</td>
          </thead>
          <tbody className={classes.tbody}>
            {categories &&
              categories.map((category) => {
                return (
                  <tr key={category.id} className={classes.tr}>
                    <td className={classes.tr}>{category.title}</td>
                    <td className={classes.tr}>{category.metaTitle}</td>
                    <td className={classes.tr}>{category.content}</td>
                    <td>
                      <button
                        className={classes.btn}
                        onClick={() => {
                          CategoryDeleteHandler(category.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className={classes.btn}
                        onClick={() => {
                          updateHandler(category.id);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default AdminCategories;
