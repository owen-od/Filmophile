import React from "react";
import { Grid, Typography, Avatar, Button, Box } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";

const UserDetails = (props) => {
  const { user } = UserAuth();

  const backgroundImage = `${process.env.PUBLIC_URL}/assets/watching.jpg`;

  return (
    <Grid
      container
      spacing={2}
      mt={.3}
      position="relative"
      sx={{
        "&::before": {
          content: "''",
          backgroundImage: `url(${backgroundImage})`,
          position: "absolute",
          backgroundSize: "contain",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          opacity: 0.1,
        },
      }}
    >
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
