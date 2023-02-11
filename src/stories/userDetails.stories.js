import React from "react";
import UserDetails from "../components/details/userDetails";
import SampleMovie from "./sampleData";

export default {
  title: "User Page/UserDetails",
  component: UserDetails,
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

  return (
    <UserDetails movies={movies}/>
  );
};
Basic.storyName = "Default";