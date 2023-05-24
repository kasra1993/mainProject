import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import { sendNewNews } from "../../../store/actions";
import { newsActions } from "../../../store/news-slice";

const AdminNews = () => {
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const loadedNews = useSelector((state) => state.newsReducer.news);
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [id, setId] = useState();

  ///// SETTING DATE /////
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate() + 1;
  var newDay = day === 32 ? (day = 1) : day;
  var today = date.getFullYear() + "-" + month + "-" + newDay;

  ////
  useEffect(() => {
    setNews(loadedNews);
  }, [loadedNews]);

  ///////// UpdateButton //////////

  const updateButtonHandler = (id) => {
    setShowUpdateButton(true);
    const newItem = loadedNews.find((item) => item.NewsId === id);
    setTitle(newItem.title);
    setDescription(newItem.description);
    setId(id);
    console.log(newItem, "new item");
  };

  /////// UPDATEHANDLER //////////

  const updateHandler = () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    Axios.put(`http://localhost:5000/updateNews/${id}`, {
      title: title,
      description: description,
    });
    const newNews = loadedNews.map((nws) => {
      if (nws.NewsId === id) {
        return {
          ...nws,
          title: title,
          description: description,
        };
      }
      return nws;
    });
    setNews(newNews);

    dispatch(
      newsActions.getNews({
        news: newNews,
      })
    );
  };

  /////////////// SUBMIT A NEW POST  ///////////////////

  const submitHandler = async (event) => {
    event.preventDefault();
    const newNewsToBeInserted = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      createdAt: today.substring(0, 10),
    };
    const responseData = await dispatch(sendNewNews(newNewsToBeInserted));
    if (responseData) {
      const insertedItemId = responseData.data.insertId;
      console.log(insertedItemId);
      const insertedNews = { ...newNewsToBeInserted, insertedItemId };
      const formData = new FormData();
      formData.append("newsId", insertedItemId);

      formData.append("file", file);
      Axios.post("http://localhost:5000/uploadNewsImage", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      const newNews = [...news, insertedNews];
      setNews(newNews);
      dispatch(newsActions.getNews({ news: newNews }));
      setTitle("");
      setDescription("");
    }
  };

  /////////////////////////// DELETE A POST ///////////////////////////

  const deleteHandler = (id) => {
    Axios.delete(`http://localhost:5000/deleteNews/${id}`);
    const newNews = news.filter((nws) => nws.NewsId !== id);
    setNews(newNews);
  };
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(file);
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

          <input type="file" name="file" onChange={onFileChange} id="file" />
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
      <table>
        <thead>
          <tr>
            <th className="col-md-3">Id</th>
            <th className="col-md-3">Name</th>
            <th className="col-md-3">Action</th>
            <th className="col-md-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {news &&
            news.map((nws) => {
              return (
                <tr key={nws.id}>
                  <td className="col-md-3">{nws.NewsId}</td>
                  <td className="col-md-3">{nws.title}</td>
                  <td className="col-md-3">{nws.description}</td>
                  <td className="col-md-3">{nws.createdAt}</td>
                  <td className="col-md-3">
                    <button
                      onClick={() => {
                        updateButtonHandler(nws.NewsId);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td className="col-md-3">
                    <button
                      onClick={() => {
                        deleteHandler(nws.NewsId);
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
    </Fragment>
  );
};
export default AdminNews;
