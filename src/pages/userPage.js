import { Grid, Typography, useMediaQuery, Box, Divider } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import UserDetails from "../components/details/userDetails";
import MovieCarousel from "../components/carousels/movieCarousel";
import { UserAuth } from '../context/AuthContext';

const UserPage = (props) => {
  const movies = props.movies;
  const  { user } = UserAuth();
 
  //const isBigScreen = useMediaQuery("(min-width:1024px)");
  const isNonMobile = useMediaQuery("(min-width:650px)");

  return (
    <>
      <UserDetails />
      <Divider></Divider>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          direction="row"
          alignItems="center"
          sx={{ paddingBottom: "10px" }}
        >
          <Divider sx={{mt: 5}}/>
          <Box
            paddingRight={isNonMobile ? 10 : 3}
            paddingLeft={isNonMobile ? 10 : 3}
            paddingTop={3}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ padding: "10px", mb: 1 }}
            >
              Favourite Movies
            </Typography>
            <MovieCarousel movies={movies}></MovieCarousel>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          direction="row"
          alignItems="center"
          sx={{ paddingBottom: "10px" }}
        >
          <Divider></Divider>
          <Box
            paddingRight={isNonMobile ? 10 : 3}
            paddingLeft={isNonMobile ? 10 : 3}
            paddingTop={5}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ padding: "10px", mb: 1 }}
            >
              Watchlist
            </Typography>
            <MovieCarousel movies={movies}></MovieCarousel>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default UserPage;