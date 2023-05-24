import { Fragment } from "react";
import AddNews from "./AddNews";
import NewsList from "./NewsList";
import React from "react";

const News = () => {
  return (
    <Fragment>
      <AddNews />
      <NewsList />
    </Fragment>
  );
};
export default News;
