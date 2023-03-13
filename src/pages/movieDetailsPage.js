import { Grid, Typography, useMediaQuery, Box, Divider } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import MovieDetails from "../components/details/movieDetails";
import CastCarousel from "../components/carousels/castCarousel";
import CommentBox from "../components/comments/commentBox";
import { useQuery } from "react-query";
import { getMovie, getMovieCast } from "../api/movie-api";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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

  const isLoading = castLoading || movieLoading;
  const isError = movieError || castError;
  const error = [movieErrorMessage, castErrorMessage];

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
        paddingBottom={0}
        paddingTop={8}
      >
        <CommentBox movie={movie} />
      </Box>
      <Footer />
    </>
  );
};
export default MovieDetailsPage;
