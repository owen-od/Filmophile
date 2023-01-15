import React from "react";
import MovieCard from "../components/movieCards/movieCard";
import SampleFilm from "./sampleData"

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
};

export const Basic = () => {
  return (
    <MovieCard movie={SampleFilm} />
  );
};
Basic.storyName = "Default";

export const NoPoster = () => {
  const sampleFilmNoPoster = { ...SampleFilm, poster_path: undefined };
  return (
    <MovieCard movie={sampleFilmNoPoster}/>
  );
};
NoPoster.storyName = "No Poster";