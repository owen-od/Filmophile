import React from "react";
import { Grid, Typography, Avatar, Divider, Button, useMediaQuery, Box } from "@mui/material";
import MovieCarousel from "../carousels/movieCarousel";

const UserDetails = () => {
  
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item align="center" xs={12}>
        <Typography variant="h4" component="p">
          Username@user.com
        </Typography>
        <Avatar
          alt="User Image"
          sx={{ width: 220, height: 220, mt: 2 }}
        ></Avatar>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="outlined" align="center">
          Update Image
        </Button>
      </Grid>
      <Grid item xs={6} align="center">
      <Typography variant="h4" component="p">
          15
        </Typography>
        <Typography variant="h5" component="p">
        Favourite Movies
        </Typography>
      </Grid>
      <Grid item xs={6} align="center">
      <Typography variant="h4" component="p">
          15
        </Typography>
        <Typography variant="h5" component="p">
          Movies in Watchlist
        </Typography>
      </Grid>
      
    </Grid>
  );
};
export default UserDetails;
