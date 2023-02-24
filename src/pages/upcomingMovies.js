import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Footer from "../components/siteFooter/footer";
import FilterMovies from "../components/filterMovies/filterMovies";
import MovieCard from "../components/movieCards/movieCard";
import MoviePagination from "../components/pagination/pagination";
import { useQuery } from "react-query";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { getUpcomingMovies } from "../api/movie-api";
import "@fontsource/righteous";

const UpcomingMoviesPage = () => {
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const genreId = Number(genreFilter);

  const cachedPage = parseInt(localStorage.getItem("upcomingMoviesPage"));
  let defaultPage = 1;
  //const movies = props.movies;

  if (cachedPage) {
    defaultPage = cachedPage;
  }

  const [pageNumber, setPageNumber] = useState(defaultPage);

  const { data, error, isLoading, isError } = useQuery(
    ["Upcoming", pageNumber],
    () => getUpcomingMovies(pageNumber),
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
    return (
      <span>
        <h1>There was an error </h1>
        {error.map((e) => (e ? <h1>Error Message: {e.message}</h1> : null))}
      </span>
    );
  }

  const movies = data.results;

  let displayedMovies = movies
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average > ratingFilter;
    });

  const handleChange = (type, value) => {
    if (type === "rating") {
      setRatingFilter(value);
    } else {
      setGenreFilter(value);
    }
  };

  const pageChange = (value) => {
    setPageNumber(value);
    console.log("Change upcoming movies page number to " + value);
    localStorage.setItem("upcomingMoviesPage", value);
  };

  return (
    <>
      <Typography variant="h2" component="h2" fontFamily="Righteous">
        Upcoming Movies
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
            genreFilter={genreFilter}
            onUserInput={handleChange}
            ratingFilter={ratingFilter}
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
export default UpcomingMoviesPage;
