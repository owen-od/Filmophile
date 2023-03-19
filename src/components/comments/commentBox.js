import React, { useEffect, useState } from "react";
import { Divider, Avatar, Grid, Paper, Typography, Box } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CommentForm from "../forms/commentForm";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Comment from "./comments";

export default function CommentBox(movie) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "movies", `${movie.movie?.id}`), (doc) => {
      const movieComments = [];
      if (doc.data()) {
        if (doc.data().comments) {
          doc.data().comments.forEach((comment) => {
            movieComments.push(comment);
          });
          setComments(movieComments);
        }
      }
    });
  }, []);

  return (
    <Paper sx={{ padding: "20px 20px" }}>
      <Typography
        variant="h4"
        fontFamily="Righteous"
        align="center"
        sx={{ mb: 2 }}
      >
        Join the conversation
      </Typography>
      <CommentForm movie={movie} />
      <Grid
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "350px",
          "&::-webkit-scrollbar": {
            width: "0.5em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
      >
        {comments.length > 0 ? (
          <>
            {comments.map((comment, index) => (
              <Comment comment={comment} key={index} />
            ))}
          </>
        ) : (
          <>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar>AD</Avatar>
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  admin@admin.com
                </Typography>
                <Typography variant="body2">
                  There are no comments here yet. Tell us what you thought and
                  be the first to share your views!
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2" sx={{ mt: 1, color: "gray" }}>
                    1 June 2022
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      marginRight: 5,
                    }}
                  >
                    <FavoriteBorderOutlinedIcon fontSize="small" />0
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
          </>
        )}
      </Grid>
    </Paper>
  );
}
