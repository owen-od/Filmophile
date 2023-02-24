import { Grid, Typography, useMediaQuery, Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Footer from "../components/siteFooter/footer";
import FilterMovies from "../components/filterMovies/filterMovies";
import MovieCard from "../components/movieCards/movieCard";
import MoviePagination from "../components/pagination/pagination";
import MovieSearch from "../components/forms/searchMovies";
import { searchMovies } from "../api/movie-api";
import { CircularProgress } from "@mui/material";

const SearchMoviesPage = () => {
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading, isError } = useQuery(
    ["search", searchTerm],
    () => searchMovies(searchTerm),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return (
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  let displayedMovies = movies.filter((m) => {
    return genreId > 0 ? m.genre_ids.includes(genreId) : true;
  });

  const handleChange = (type, value) => {
    setGenreFilter(value);
  };

  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Search Movies
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
          <FilterMovies genreFilter={genreFilter} onUserInput={handleChange} />
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
          <MovieSearch searchMovies={searchHandler} />
          {displayedMovies.map((m) => (
            <Grid item key={m.id}>
              <MovieCard key={m.id} movie={m} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default SearchMoviesPage;
