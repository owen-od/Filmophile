import React from "react";
import CommentBox from "../components/forms/commentBox";

export default {
  title: "MoviePage/CommentBox",
  component: CommentBox,
};

export const Basic = () => {
  return (
    <CommentBox />
  );
};
Basic.storyName = "Default";