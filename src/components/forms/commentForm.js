import React, {useContext, useState} from "react";
import {
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import { MoviesContext } from "../../context/moviesContext";
import { UserAuth } from '../../context/AuthContext';


export default function CommentForm(props) {
  const [comment, setComment] = useState("");
  const { addComment } = useContext(MoviesContext);
  const movie = props.movie;
  const  { user } = UserAuth();

  const handleSubmit= (e, comment) => {
    e.preventDefault()
    if (!user) {
      alert ("Please log in to add comments") 
    } else {
    addComment(movie, comment);
    setComment("");
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, comment)}>
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Have your say"
          type="text"
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 4, label: { color: "text.primary"}}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button type="submit" variant="contained" color="primary">
                  Post
                </Button>
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength: 1000
          }}
        />
      </form>
      </>
  );
}
