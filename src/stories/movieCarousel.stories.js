import React from "react";
import MovieCarousel from "../components/carousels/movieCarousel";
import SampleMovie from "./sampleData";

export default {
  title: "Home Page/MovieCarousel",
  component: MovieCarousel,
};

export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
    { ...SampleMovie, id: 6 },
    { ...SampleMovie, id: 7 },
  ];

  return <MovieCarousel movies={movies} />;
};
Basic.storyName = "Default";
