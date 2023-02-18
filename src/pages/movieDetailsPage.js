import { Grid, Typography, useMediaQuery, Box, Divider } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import MovieDetails from "../components/details/movieDetails";
import CastCarousel from "../components/carousels/castCarousel";
import CommentBox from "../components/forms/commentBox";

const MovieDetailsPage = (props) => {
  const movie = props.movie;
  const cast = props.cast;
  const isBigScreen = useMediaQuery("(min-width:1024px)");
  const isNonMobile = useMediaQuery("(min-width:650px)");

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
          component="h3"
          align="center"
          sx={{ paddingTop: 5, paddingBottom: 2 }}
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
        <CommentBox />
      </Box>
      <Footer />
    </>
  );
};
export default MovieDetailsPage;
