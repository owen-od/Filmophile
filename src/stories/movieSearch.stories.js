import React from "react";
import MovieSearch from "../components/forms/searchMovies";

export default {
  title: "Search Page/SearchBar",
  component: MovieSearch,
};

export const Basic = () => {
  return (
    <MovieSearch />
  );
};
Basic.storyName = "Default";