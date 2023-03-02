import { Grid, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { getTopMovies, getPopularMovies, getUpcomingMovies } from "../api/movie-api";
import MovieCarousel from "../components/carousels/movieCarousel";
import MainCarousel from "../components/carousels/mainCarousel";
import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import Footer from "../components/siteFooter/footer";
import { CircularProgress } from '@mui/material';

const HomePage = (props) => {
  //const movies = props.movies;
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const {
    data: topData,
    error: topError,
    isLoading: topIsLoading,
    isError: topIsError,
  } = useQuery(["topRated", { page: 1 }], getTopMovies);

  const {
    data: upcomingData,
    error: upcomingError,
    isLoading: upcomingIsLoading,
    isError: upcomingIsError,
  } = useQuery(["Upcoming", { page: 1 }], getUpcomingMovies);

  const {
    data: popularData,
    error: popularError,
    isLoading: popularIsLoading,
    isError: popularIsError,
  } = useQuery(["Popular", { page: 1 }], getPopularMovies);

  const isLoading = topIsLoading || upcomingIsLoading || popularIsLoading;
  const isError = topError || upcomingError || popularError ;
  const error = [topIsError, upcomingIsError || popularIsError];

  if (isLoading) {
    return (
      <div sx={{display: "flex", justifyContent: "center"}}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <span>
        <h1>There was an error </h1>
        {error.map((e) => (e ? <h1>Error Message: {e.message}</h1> : null))}
      </span>
    );
  }

  const topMovies = topData.results;
  const upcomingMovies = upcomingData.results;
  const popularMovies = popularData.results;

  return (
    <>
      <Grid container >
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
            <MovieCarousel movies={popularMovies}></MovieCarousel>
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
            <MovieCarousel movies={upcomingMovies}></MovieCarousel>
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
            <MovieCarousel movies={topMovies}></MovieCarousel>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default HomePage;
