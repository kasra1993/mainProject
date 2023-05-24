import React, { Fragment } from "react";
import classes from "./App.module.css";
import { useEffect } from "react";
import { useState } from "react";
import MainNavigation from "./components/Layout/MainNavigation";
import { useDispatch, useSelector } from "react-redux";
import HomeProducts from "./components/Home/HomeProducts";
import { fetchProductData } from "./store/actions";
import Cart from "./components/Cart/Cart";
const App = () => {
  const [uploadStatus, setUploadStatus] = useState("");

  const products = useSelector((state) => state.products.products);
  const showCart = useSelector((state) => state.cart.cartIsVisible);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);
  let content = "";
  if (products) {
    content = products.map((product) => (
      <HomeProducts
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        discount_id={product.discount_id}
        category_id={product.category_id}
      />
    ));
  }
  // console.log(image + "this is image");
  // const imageAddress = image ? `'../../server/Uploads/${image}'` : "";
  // console.log("this is image address");
  // console.log(imageAddress);
  // const send = () => {
  //   const data = new FormData();
  //   data.append("name", name);
  //   data.append("file", file);
  //   Axios.post("http://localhost:5000/upload", data)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  // const sendFiles = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", "someName");
  //   for (let index = 0; index < images.length; index++) {
  //     formData.append("imgCollection", images[index]);
  //   }

  //   Axios.post("http://localhost:5000/uploadImages", formData)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // };
  // useEffect(() => {
  //   Axios.get("http://localhost:5000/getImage").then((response) => {
  //     console.log(response);
  //     const imageArray = response.data;
  //     const newImage = imageArray[3].file_src;
  //     setImage("http://localhost:5000/" + newImage);
  //   });
  // }, [image]);
  // console.log(loadedImages);
  // useEffect(() => {
  //   Axios.get("http://localhost:5000/getImages").then((response) => {
  //     const imageArray = response.data;
  //     const newImages = imageArray;
  //     setLoadedImages(newImages);
  //   });
  // }, []);
  // console.log("this is the data we are sending ");
  // console.log(images);
  // const onFileChange = (e) => {
  //   setImages(e.target.files);
  // };
  return (
    <Fragment>
      <div className={classes.container}>
        <div>
          <MainNavigation />
        </div>
        <h1>{uploadStatus}</h1>

        <div className={classes.slider}>
          {/* {showCart ? (
          <Cart />
        ) : (
          <div>
            <div className={classes.home_products_items}>{content}</div>
          </div>
        )} */}
        </div>
      </div>
    </Fragment>
  );
};
export default App;
