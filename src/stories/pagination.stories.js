import React from "react";
import MoviePagination from "../components/pagination/pagination";

export default {
  title: "MoviePages/Pagination",
  component: MoviePagination,
};

export const Basic = () => {
  return (
    <MoviePagination />
  );
};
Basic.storyName = "Default";