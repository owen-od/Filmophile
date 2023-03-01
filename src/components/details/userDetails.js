import React from "react";
import { Grid, Typography, Avatar, Button } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";

const UserDetails = (props) => {
  const { user } = UserAuth();

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item align="center" xs={12}>
        <Typography variant="h4" component="p">
          {user.email}
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
          {props.numberOfFavs}
        </Typography>
        <Typography variant="h5" component="p">
          Favourite Movies
        </Typography>
      </Grid>
      <Grid item xs={6} align="center">
        <Typography variant="h4" component="p">
          {props.numberWatchlist}
        </Typography>
        <Typography variant="h5" component="p">
          Movies in Watchlist
        </Typography>
      </Grid>
    </Grid>
  );
};
export default UserDetails;
