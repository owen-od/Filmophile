import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import FilterMovies from "../components/filterMovies/filterMovies";
import MovieCard from "../components/movieCards/movieCard";
import MoviePagination from "../components/pagination/pagination";
import { useQuery } from "react-query";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { getPopularMovies } from "../api/movie-api";
import { useDisplayedMovies } from "../hooks/useFilterSortMovies";

const PopularMoviesPage = () => {
  
  const cachedPage = parseInt(localStorage.getItem("popularMoviesPage"));
  let defaultPage = 1;
  //const movies = props.movies;

  if (cachedPage) {
    defaultPage = cachedPage;
  }

  const [pageNumber, setPageNumber] = useState(defaultPage);

  const { data, error, isLoading, isError } = useQuery(
    ["Popular", pageNumber],
    () => getPopularMovies(pageNumber),
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
    return (
      <span>
        <h1>There was an error </h1>
        {error.map((e) => (e ? <h1>Error Message: {e.message}</h1> : null))}
      </span>
    );
  }

  const pageChange = (value) => {
    setPageNumber(value);
    console.log("Change popular movies page number to " + value);
    localStorage.setItem("popularMoviesPage", value);
  };

  return (
    <>
      <Typography variant="h2" component="h2" fontFamily="Righteous">
        Popular Movies
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
          {displayedMovies.map((m) => (
            <Grid item key={m.id}>
              <MovieCard key={m.id} movie={m} />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ mt: 5 }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <MoviePagination
                pageNumber={pageNumber}
                pageChange={pageChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default PopularMoviesPage;
