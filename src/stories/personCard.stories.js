import React from "react";
import PersonCard from "../components/peopleCards/personCard";
import SamplePerson from "./samplePerson";

export default {
  title: "MoviePage/PersonCard",
  component: PersonCard,
};

export const Basic = () => {
  return (
    <PersonCard
      person={SamplePerson}
    />
  );
};
Basic.storyName = "Default";

export const Cast = () => {
  const sampleWithRole = { ...SamplePerson, character: "Penny" };
  return (
    <PersonCard
      person={sampleWithRole}
    />
  );
};

export const Exceptional = () => {
  const sampleNoProfile = { ...SamplePerson, profile_path: undefined };
  return (
    <PersonCard
      person={sampleNoProfile}
    />
  );
};
Exceptional.storyName = "exception";