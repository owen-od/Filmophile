import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Footer from "../components/siteFooter/footer";
import FilterMovies from "../components/filterMovies/filterMovies";
import MovieCard from "../components/movieCards/movieCard";
import MovieSearch from "../components/forms/searchMovies";
import { searchMovies } from "../api/movie-api";
import { CircularProgress } from "@mui/material";
import { useDisplayedMovies } from "../hooks/useFilterSortMovies";

const SearchMoviesPage = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading, isError } = useQuery(
    ["search", searchTerm],
    () => searchMovies(searchTerm),
    {
      keepPreviousData: true,
    }
  );

  const movies = data ? data.results : [];

  //logic for displayed movies and change of filter/sorting options in custom hook
  const { displayedMovies, handleChange } = useDisplayedMovies(movies);

  //initial filters to pass down to filterMovies component as props
  const initialFilters = {
    genreFilter: "0",
    ratingFilter: "0",
    textFilter: "",
    movieSorter: "title",
  };

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

  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Typography variant="h2" component="h2" fontFamily="Righteous">
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
          <FilterMovies
            onUserInput={handleChange}
            filters={initialFilters}
          />
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
