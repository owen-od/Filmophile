import React from "react";
import CastCarousel from "../components/carousels/castCarousel";
import SamplePerson from "./samplePerson";

export default {
  title: "MoviePage/CastCarousel",
  component: CastCarousel,
};

export const Basic = () => {
  const cast = [
    { ...SamplePerson, id: 1 },
    { ...SamplePerson, id: 2 },
    { ...SamplePerson, id: 3 },
    { ...SamplePerson, id: 4 },
    { ...SamplePerson, id: 5 },
    { ...SamplePerson, id: 6 },
    { ...SamplePerson, id: 7 },
  ];

  return <CastCarousel cast={cast} />;
};
Basic.storyName = "Default";
