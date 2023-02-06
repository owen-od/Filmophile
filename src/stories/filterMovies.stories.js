import React from "react";
import FilterMovies from "../components/filterMovies/filterMovies";

export default {
  title: "MoviePages/FilterMovies",
  component: FilterMovies,
};

export const Basic = () => {
  return (
    <FilterMovies />
  );
};
Basic.storyName = "Default";