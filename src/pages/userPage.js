import {
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useQueries } from "react-query";
import Footer from "../components/siteFooter/footer";
import UserDetails from "../components/details/userDetails";
import { MoviesContext } from "../context/moviesContext";
import { getMovie } from "../api/movie-api";
import MovieCard from "../components/movieCards/movieCard";
import { Tabs, Tab } from "@mui/material";

const UserPage = () => {
  //const movies = props.movies;
  const { favourites: favIds } = useContext(MoviesContext);
  const { watchlist: watchlistIds } = useContext(MoviesContext);
  const numberOfFavs = favIds.length;
  const numberWatchlist = watchlistIds.length;
  const [value, setValue] = useState(0);

  // Create an array of queries and run in parallel.
  const favouriteMovieQueries = useQueries(
    favIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  // Create an array of queries and run in parallel.
  const wathclistMovieQueries = useQueries(
    watchlistIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const FavsIsLoading = favouriteMovieQueries.find((m) => m.isLoading === true);
  const WatchlistIsLoading = wathclistMovieQueries.find(
    (m) => m.isLoading === true
  );
  const isLoading = FavsIsLoading || WatchlistIsLoading;

  if (isLoading) {
    return (
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  const favMovies = favouriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  const watchlistMovies = wathclistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let displayedMovies = favMovies;

  if (value == 0) {
    displayedMovies = favMovies;
  } else {
    displayedMovies = watchlistMovies;
  }

  return (
    <>
      <UserDetails
        numberOfFavs={numberOfFavs}
        numberWatchlist={numberWatchlist}
      />
      <Divider></Divider>
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            sx={{ bgcolor: "secondary.main" }}
            centered
          >
            <Tab label="Favourites" />
            <Tab label="Watchlist" />
          </Tabs>
        </Grid>

        <Grid
          container
          xs={12}
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
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default UserPage;
