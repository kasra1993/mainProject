import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./NewProduct.module.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendUpdatedProductItem } from "../../store/actions";
import { DateTimeInput } from "react-hichestan-datetimepicker";
import { productActions } from "../../store/product-slice";
import { sendNewProduct } from "../../store/actions";
import Axios from "axios";

// import {
//   DateTimeInput,
//   DateTimeInputSimple,
//   DateInput,
//   DateInputSimple,
// } from "react-hichestan-datetimepicker";

const NewProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  ///// INPUT STATES
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [discount, setDiscount] = useState("");
  const [summary, setSummary] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [shop, setShop] = useState(1);

  const [categoryid, setCategoryId] = useState(1);
  const [subCategoryId, setSubCategoryId] = useState();

  const [selectedCategoryValue, setSelectedCategoryValue] = useState();
  const [selectedSubCatValue, setSelectedSubCatValue] = useState();
  const [subCategories, setSubCategories] = useState([]);

  ///////////
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate() + 1;
  var today = date.getFullYear() + "-" + month + "-" + day;

  /////////////////////////// GETTING THE SUB CATEGORIES //////////////////////////

  const loadedSubCategories = useSelector(
    (state) => state.categoryReducer.subCategories
  );
  const newArr = loadedSubCategories.filter(
    (ar) => ar.category_id == selectedCategoryValue
  );
  useEffect(() => {
    setSubCategories(
      loadedSubCategories.filter(
        (sub) => sub.category_id == selectedCategoryValue
      )
    );
  }, [selectedCategoryValue]);
  useEffect(() => {
    setSubCategories(newArr);

    console.log(loadedSubCategories, "it is getting here");
  }, [loadedSubCategories]);

  //////////// HANDLING THE UPDATING ITEM AND PUTTING IT IN INPUTS

  const isSetForUpdate = useSelector((state) => state.products.isSetForUpdate);
  const [isSetForUpdateButton, setIsSetForUpdateButton] = useState(
    isSetForUpdate
  );

  const updatedItem = useSelector((state) => state.products.productUpdateInfo);
  useEffect(() => {
    setTitle(updatedItem.title);
    setPrice(updatedItem.price);
    setContent(updatedItem.content);
    setQuantity(updatedItem.quantity);
    setSummary(updatedItem.summary);
    setStartingDate(updatedItem.startsAt);
    setEndingDate(updatedItem.endsAt);
    setDiscount(updatedItem.discount);
    setMetaTitle(updatedItem.metaTitle);
    setCategoryId(updatedItem.categoryid);
    setId(updatedItem.id);
  }, [updatedItem]);
  const startingDateHandler = (event) => {
    setStartingDate(event.target.value.substring(0, 10));
  };
  const endingDateHandler = (event) => {
    setEndingDate(event.target.value.substring(0, 10));
  };
  const selectSubChangeHandler = (e) => {
    setSelectedSubCatValue(e.target.value);
  };
  const selectChangeHandler = (e) => {
    setSelectedCategoryValue(e.target.value);
  };
  const shopHandler = () => {
    setShop(0);
  };
  const [categories, setCategories] = useState([]);

  const loadedCategories = useSelector(
    (state) => state.categoryReducer.categoryItems
  );
  const metaTitleRef = useRef();
  const summaryRef = useRef();
  const contentRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();
  const titleRef = useRef();
  const discountRef = useRef();
  ////////////////////////////// USEEFFECT SECTION /////////////////////////////////
  useEffect(() => {
    setCategories(loadedCategories);
  }, [loadedCategories]);

  useEffect(() => {
    Axios.get("http://localhost:5000/getImages").then((response) => {
      const imageArray = response.data;
      const newImages = imageArray;
      setLoadedImages(newImages);
    });
  }, []);

  /////////////////////////////////////// UPDATE BUTTON HANDLER /////////////// */

  const productUpdateHandler = (id) => {
    const updatePutItem = {
      newStartingDate: startingDate.substring(0, 10),
      newEndingDate: endingDate.substring(0, 10),
      title: titleRef.current.value,
      price: priceRef.current.value,
      summary: summaryRef.current.value,
      categoryid: selectedCategoryValue,
      discount: discountRef.current.value,
      content: contentRef.current.value,
      quantity: quantityRef.current.value,
      id: id,
      createdAt: today.substring(0, 10),
      meta: metaTitleRef.current.value,
    };
    const newProducts = products.map((product) => {
      if (product.id === updatePutItem.id) {
        return {
          ...product,
          title: updatePutItem.title,
          summary: updatePutItem.summary,
          quantity: updatePutItem.quantity,
          discount: updatePutItem.discount,
          categoryid: updatePutItem.categoryid,
          price: updatePutItem.price,
          content: updatePutItem.content,
          metaTitle: updatePutItem.meta,
          startsAt: updatePutItem.newStartingDate,
          endsAt: updatePutItem.newEndingDate,
        };
      }
      return product;
    });

    dispatch(productActions.get({ products: newProducts }));
    dispatch(sendUpdatedProductItem(updatePutItem));
    setIsSetForUpdateButton(false);
    setTitle("");
    setPrice("");
    setContent("");
    setQuantity("");
    setSummary("");
    setStartingDate("");
    setEndingDate("");
    setDiscount("");
    setMetaTitle("");
    setCategoryId("");
    setId("");
  };

  //////////////////////////////////////// SUBMIT HANDLER //////////////////////

  const submitHandler = async (event) => {
    event.preventDefault();
    const newProductToBeInserted = {
      title: titleRef.current.value,
      shop: shop,
      price: priceRef.current.value,
      summary: summaryRef.current.value,
      categoryid: selectedCategoryValue,
      discount: discountRef.current.value,
      content: contentRef.current.value,
      quantity: quantityRef.current.value,
      startsAt: startingDate ? startingDate.substring(0, 10) : null,
      endsAt: endingDate ? endingDate.substring(0, 10) : null,
      createdAt: today.substring(0, 10),
      meta: metaTitleRef.current.value,
      subcategoryid: selectedSubCatValue,
    };
    const newProductInsertionResponse = dispatch(
      sendNewProduct(newProductToBeInserted)
    );
    console.log(newProductInsertionResponse);
    const data = await newProductInsertionResponse;
    if (data) {
      const insertedItemId = data.data.insertId;
      const formData = new FormData();
      formData.append("productItemId", insertedItemId);
      for (let index = 0; index < images.length; index++) {
        formData.append("imgCollection", images[index]);
      }

      Axios.post("http://localhost:5000/uploadImages", formData)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      const newProducts = [...products, newProductToBeInserted];
      dispatch(productActions.get({ products: newProducts }));
      setTitle("");
      setPrice("");
      setContent("");
      setQuantity("");
      setSummary("");
      setStartingDate("");
      setEndingDate("");
      setDiscount("");
      setMetaTitle("");
      setCategoryId(1);
      setId("");
      setContent("");
    }
  };
  const onFileChange = (e) => {
    setImages(e.target.files);
  };
  return (
    <Fragment>
      <form
        action=""
        className={classes.app}
        encType="multipart/form-data"
        id="productForm"
      >
        <div className={classes.div1}>
          <label htmlFor="">Title</label>
          <input
            className={classes.item}
            type="text"
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">Price</label>
          <input
            className={classes.item}
            type="number"
            ref={priceRef}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="">category</label>
          <select
            className={classes.item}
            onChange={selectChangeHandler}
            value={categoryid}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <label htmlFor="">Sub Category</label>
          <select
            className={classes.item}
            onChange={selectSubChangeHandler}
            value={subCategoryId}
          >
            {subCategories.map((subcat) => (
              <option value={subcat.id} key={subcat.id}>
                {subcat.name}
              </option>
            ))}
          </select>
          <label htmlFor="">metaTitle</label>
          <input
            type="text"
            ref={metaTitleRef}
            className={classes.item}
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
          <label htmlFor="">summary</label>
          <input
            type="text"
            ref={summaryRef}
            className={classes.item}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <label htmlFor="">quantity</label>
          <input
            type="text"
            ref={quantityRef}
            className={classes.item}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className={classes.div1}>
          <label htmlFor="">discount</label>
          <input
            type="text"
            ref={discountRef}
            className={classes.item}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <label htmlFor="">select start date</label>
          <DateTimeInput
            value={startingDate}
            onChange={startingDateHandler}
            className={classes.item}
          />
          <label htmlFor=""> select end date </label>
          <DateTimeInput
            value={endingDate}
            onChange={endingDateHandler}
            className={classes.item}
          />

          <label htmlFor="">not available</label>
          <input
            type="checkbox"
            onChange={shopHandler}
            className={classes.item}
          />
          <label htmlFor="">this is used for multiple images</label>
          <input
            type="file"
            name="imgCollection"
            onChange={onFileChange}
            multiple
          />
          {isSetForUpdate ? (
            <button
              type="button"
              className={classes.btn}
              onClick={() => {
                productUpdateHandler(id);
              }}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className={classes.btn}
              onClick={submitHandler}
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <label htmlFor="">content </label>

      <textarea
        form="productForm"
        rows="15"
        cols="30"
        ref={contentRef}
        className={classes.textbox}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </Fragment>
  );
};
export default NewProduct;
