import React from "react";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function CommentBox() {
  return (
    <Paper sx={{ padding: "20px 20px" }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Join the conversation
      </Typography>
      <form>
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Have your say"
          type="text"
          name="email"
          sx={{ mb: 4 }}
        />
      </form>
      <Grid
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "500px",
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
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>OD</Avatar>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Owen O'Donnell
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" sx={{ mt: 1, color: "gray" }}>
                posted 1 June 2022
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
                <FavoriteBorderOutlinedIcon fontSize="small" />
                10
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>OD</Avatar>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Owen O'Donnell
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" sx={{ mt: 1, color: "gray" }}>
                posted 2 June 2022
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
                <FavoriteBorderOutlinedIcon fontSize="small" />
                10
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>OD</Avatar>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Owen O'Donnell
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" sx={{ mt: 1, color: "gray" }}>
                posted 3 June 2022
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
                <FavoriteBorderOutlinedIcon fontSize="small" />
                10
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>OD</Avatar>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Owen O'Donnell
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" sx={{ mt: 1, color: "gray" }}>
                posted 4 June 2022
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
                <FavoriteBorderOutlinedIcon fontSize="small" />
                12
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
