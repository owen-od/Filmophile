import React from "react";
import NavBar from "../components/navigation/navbar";

export default {
  title: "General/NavBar",
  component: NavBar,
};

export const Basic = () => {
  return (
    <NavBar />
  );
};
Basic.storyName = "Default";