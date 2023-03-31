import React, { useContext } from "react";
import {
  Divider,
  Avatar,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MoviesContext } from "../../context/moviesContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserAuth } from "../../context/AuthContext";

export default function Comment(props) {
  const comment = props.comment;
  const index = props.movieIndex;

  const { user } = UserAuth();

  //get liked comments and functions to change from movie context provider
  const { likes, incrementCommentLikes, decreaseCommentLikes } =
    useContext(MoviesContext);

  //get date from Firebase timestamp saved with comment and format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = comment.dateAdded.toDate().toLocaleDateString("en-IE", options);
  //console.log(comment.dateAdded.toDate().toLocaleDateString('en-IE', options))

  //call functions to increase or decrease number of likes of comments and add/remove from user liked comments
  const handleAddToLikes = () => {
    incrementCommentLikes(props.movieId, index, comment.id);
  };
  const handleRemoveFromLikes = () => {
    decreaseCommentLikes(props.movieId, index, comment.id);
  };

  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar
            src={
              comment.userPhotoUrl
                ? `${comment.userPhotoUrl}`
                : "/static/images/avatar/2.jpg"
            }
          ></Avatar>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {comment.user}
          </Typography>
          <Typography variant="body2">{comment.comment}</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" sx={{ mt: 1, color: "gray" }}>
              {date}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              {user ? (
                !likes.includes(comment.id) ? (
                  <IconButton onClick={handleAddToLikes}>
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleRemoveFromLikes}>
                    <FavoriteIcon fontSize="small" color="primary" />
                  </IconButton>
                )
              ) : (
                <IconButton disabled>
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                </IconButton>
              )}
              {comment.likes}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
    </>
  );
}
