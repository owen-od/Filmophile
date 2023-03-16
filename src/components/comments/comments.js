import React from "react";
import {
  Divider,
  Avatar,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function Comment(props) {
  const comment = props.comment;

  //get date from Firebase timestamp saved with comment and format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = comment.dateAdded.toDate().toLocaleDateString("en-IE", options);
  //console.log(comment.dateAdded.toDate().toLocaleDateString('en-IE', options))

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
              <FavoriteBorderOutlinedIcon fontSize="small" />
              {comment.likes}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
    </>
  );
}
