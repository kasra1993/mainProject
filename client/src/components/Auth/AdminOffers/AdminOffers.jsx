import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { offersActions } from "../../../store/offers-slice";
import { sendNewOffer } from "../../../store/actions";
import OffersProducts from "./OffersProducts";
const AdminOffers = () => {
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [offers, setOffers] = useState([]);

  const titleRef = useRef();
  const summaryRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState();
  const [id, setId] = useState();

  const loadedOffers = useSelector((state) => state.offersReducer.offers);
  const dispatch = useDispatch();
  const loadedProducts = useSelector((state) => state.products.products);

  // ///// SETTING DATE /////
  // var date = new Date();
  // var month = date.getMonth() + 1;
  // var day = date.getDate() + 1;
  // var newDay = day === 32 ? (day = 1) : day;
  // var today = date.getFullYear() + "-" + month + "-" + newDay;

  ////
  useEffect(() => {
    setOffers(loadedOffers);
  }, [loadedOffers]);

  ///////// UpdateButton //////////

  const updateButtonHandler = (id) => {
    setShowUpdateButton(true);
    const newItem = loadedOffers.find((item) => item.id === id);
    setTitle(newItem.title);
    setDescription(newItem.description);
    setSummary(newItem.summary);
    setImage(newItem.image_src);
    setId(id);
  };
  /////// UPDATEHANDLER //////////

  const updateHandler = () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const summary = summaryRef.current.value;
    const formData = new FormData();

    formData.append("offersTitle", title);
    formData.append("offersDescription", description);
    formData.append("offersSummary", summary);
    formData.append("offers-image", file);
    formData.append("offers_prev_image", image);

    Axios.put(`http://localhost:5000/updateOffers/${id}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const newOffers = loadedOffers.map((offer) => {
      if (offer.id === id) {
        return {
          ...offer,
          title: title,
          description: description,
          summary: summary,
        };
      }
      return offer;
    });
    setOffers(newOffers);

    dispatch(
      offersActions.getOffers({
        offers: newOffers,
      })
    );
  };

  /////////////// SUBMIT A NEW POST  ///////////////////

  const submitHandler = async (event) => {
    event.preventDefault();
    const newOfferToBeInserted = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      summary: summaryRef.current.value,
    };
    const responseData = await dispatch(sendNewOffer(newOfferToBeInserted));
    console.log(responseData);
    if (responseData) {
      const insertedItemId = responseData.data.insertId;
      const insertedOffers = { ...newOfferToBeInserted, insertedItemId };
      const formData = new FormData();
      formData.append("offersId", insertedItemId);

      formData.append("offers-image", file);
      Axios.post("http://localhost:5000/uploadOffersImage", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      const newOffers = [...offers, insertedOffers];
      setOffers(newOffers);
      dispatch(offersActions.getOffers({ offers: newOffers }));
      setTitle("");
      setDescription("");
      setSummary("");
    }
  };

  /////////////////////////// DELETE A POST ///////////////////////////

  const deleteHandler = (id) => {
    Axios.delete(`http://localhost:5000/deleteOffers/${id}`);
    const newOffers = offers.filter((offer) => offer.id !== id);
    setOffers(newOffers);
  };
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <Fragment>
      <div>
        <form action="#" encType="multipart/form-data" id="newsForm">
          <label htmlFor="">Title</label>
          <input
            type="text"
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">Summary</label>
          <input
            type="text"
            ref={summaryRef}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <input
            type="file"
            name="offers-image"
            onChange={onFileChange}
            id="offers-image"
          />
          {showUpdateButton ? (
            <button onClick={updateHandler}>Update</button>
          ) : (
            <button type="submit" onClick={submitHandler}>
              Submit
            </button>
          )}
        </form>
        <label htmlFor="">Description</label>

        <textarea
          form="newsForm"
          rows="15"
          cols="100"
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">Id</th>
            <th className="col-md-3">title</th>
            <th className="col-md-3">description</th>
            <th className="col-md-3">image</th>
            <th className="col-md-3">Action</th>
            <th className="col-md-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {offers &&
            offers.map((offer) => {
              return (
                <tr key={offer.id}>
                  <td className="col-md-3">{offer.id}</td>
                  <td className="col-md-3">{offer.title}</td>
                  <td className="col-md-3">{offer.description}</td>
                  <td className="col-md-3">
                    <img
                      src={`http://localhost:5000/public/${offer.image_src}`}
                      alt=""
                      className="img-thumbnail"
                      style={{ height: 50 }}
                    />
                  </td>
                  <td className="col-md-3">
                    <button
                      onClick={() => {
                        updateButtonHandler(offer.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td className="col-md-3">
                    <button
                      onClick={() => {
                        deleteHandler(offer.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <hr className="p-3" />
      <div className="p-5">
        <OffersProducts offers={offers} />
      </div>
    </Fragment>
  );
};
export default AdminOffers;
