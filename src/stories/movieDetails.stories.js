import React from "react";
import MovieDetails from "../components/details/movieDetails";
import SampleFilm from "./sampleData";

export default {
  title: "MoviePage/MovieDetails",
  component: MovieDetails,
};

export const Basic = () => {
  return (
    <MovieDetails movie={SampleFilm}/>
  );
};
Basic.storyName = "Default";

export const NoBackground = () => {
  const sampleNoImage = { ...SampleFilm, backdrop_path: undefined };
  return (
    <MovieDetails movie={sampleNoImage}/>
  );
};
NoBackground.storyName = "NoBackground";