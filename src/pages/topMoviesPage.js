import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import FilterMovies from "../components/filterMovies/filterMovies";
import MovieCard from "../components/movieCards/movieCard";
import MoviePagination from "../components/pagination/pagination";

const TopMoviesPage = (props) => {
  const movies = props.movies;

  return (
    <>
      <Typography variant="h2" component="h2">
        Top Movies
      </Typography>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={3}
          minHeight="100%"
          maxWidth="100%"
          sx={{ mb: 3, mt: 3 }}
        >
          <FilterMovies />
        </Grid>
        <Grid
          container
          xs={12}
          md={9}
          display="flex"
          flex-wrap="wrap"
          justifyContent="center"
          gap="30px"
          mt={3}
        >
          {movies.map((m) => (
            <Grid item key={m.id}>
              <MovieCard key={m.id} movie={m} />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ mt: 5 }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <MoviePagination />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default TopMoviesPage;
