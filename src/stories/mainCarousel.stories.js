import React from "react";
import MainCarousel from "../components/carousels/mainCarousel";

export default {
  title: "Home Page/MainCarousel",
  component: MainCarousel,
};

export const Basic = () => {
  return (
    <MainCarousel />
  );
};
Basic.storyName = "Default";

