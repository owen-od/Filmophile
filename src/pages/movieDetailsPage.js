import { Grid, Typography, useMediaQuery, Box, Divider } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import MovieDetails from "../components/details/movieDetails";
import CastCarousel from "../components/carousels/castCarousel";
import CommentBox from "../components/comments/commentBox";
import { useQuery } from "react-query";
import { getMovie, getMovieCast, getSimilarMovies } from "../api/movie-api";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import MovieCarousel from "../components/carousels/movieCarousel";

const MovieDetailsPage = (props) => {
  const isBigScreen = useMediaQuery("(min-width:1024px)");
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const { id } = useParams();
  const {
    data: movie,
    error: movieErrorMessage,
    isLoading: movieLoading,
    isError: movieError,
  } = useQuery(["movie", { id: id }], getMovie);

  const {
    data: castResult,
    error: castErrorMessage,
    isLoading: castLoading,
    isError: castError,
  } = useQuery(["movieCast", { id: id }], getMovieCast);

  const {
    data: similarResult,
    error: similarErrorMessage,
    isLoading: similarLoading,
    isError: similarError,
  } = useQuery(["similar", { id: id }], getSimilarMovies);

  const isLoading = castLoading || movieLoading || similarLoading;
  const isError = movieError || castError || similarError;
  const error = [movieErrorMessage, castErrorMessage, similarErrorMessage];

  if (isLoading) {
    return (
      <div sx={{ display: "flex", justifyContent: "center" }}>
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

  const cast = castResult.cast;
  let similarMovies;
  if (similarResult.results) {
    similarMovies = similarResult.results;
  }

  return (
    <>
      <MovieDetails movie={movie} />
      <Divider></Divider>
      <Box
        paddingRight={isNonMobile ? 10 : 3}
        paddingLeft={isNonMobile ? 10 : 3}
      >
        <Typography
          variant="h4"
          fontFamily="Righteous"
          align="center"
          sx={{ paddingBottom: 2, paddingTop: 5 }}
        >
          Meet the cast
        </Typography>
        <CastCarousel cast={cast} />
      </Box>
      <Box
        paddingRight={isBigScreen ? 12 : 1}
        paddingLeft={isBigScreen ? 12 : 1}
        paddingBottom={8}
        paddingTop={8}
      >
        <CommentBox movie={movie} />
      </Box>
      {similarMovies.length > 0 ? (
        <>
          <Grid container>
            <Grid item xs={12} sx={{ backgroundColor: "secondary.main" }}>
              <Typography
                color="primary.main"
                variant="h6"
                sx={{ fontFamily: "Pacifico" }}
                letterSpacing={1.5}
                align="center"
                p={1}
              >
                {" "}
                - Filmophile Reccomends -{" "}
              </Typography>
            </Grid>
          </Grid>
          <Box
            paddingRight={isNonMobile ? 10 : 3}
            paddingLeft={isNonMobile ? 10 : 3}
            paddingTop={5}
            sx={{ backgroundColor: "background.accent" }}
          >
            <Typography
              color="secondary.main"
              variant="subtitle2"
              fontFamily="Righteous"
              align="center"
            >
              Continue the journey
            </Typography>
            <Typography
              color="secondary.main"
              variant="h4"
              pl={2}
              fontFamily="Righteous"
              align="center"
              pb={3}
            >
              Discover similar movies
            </Typography>
            <MovieCarousel movies={similarMovies}></MovieCarousel>
          </Box>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};
export default MovieDetailsPage;
