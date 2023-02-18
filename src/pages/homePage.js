import { Grid, Typography } from "@mui/material";
import React from "react";
import MovieCarousel from "../components/carousels/movieCarousel";
import MainCarousel from "../components/carousels/mainCarousel";
import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import Footer from "../components/siteFooter/footer";
import FilterMovies from "../components/filterMovies/filterMovies";

const HomePage = (props) => {
  const movies = props.movies;
  const isNonMobile = useMediaQuery("(min-width:650px)");

  return (
    <>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <MainCarousel />
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
              What's Popular?
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
              What's Upcoming?
            </Typography>
            <MovieCarousel movies={movies}></MovieCarousel>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          direction="row"
          alignItems="center"
          sx={{ padding: "10px" }}
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
              What's Best?
            </Typography>
            <MovieCarousel movies={movies}></MovieCarousel>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default HomePage;
