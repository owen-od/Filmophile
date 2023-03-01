import { Grid, Typography, useMediaQuery, Box, Divider, CircularProgress } from "@mui/material";
import React, {useContext} from "react";
import { useQueries } from "react-query";
import Footer from "../components/siteFooter/footer";
import UserDetails from "../components/details/userDetails";
import MovieCarousel from "../components/carousels/movieCarousel";
import { MoviesContext } from "../context/moviesContext";
import { getMovie } from "../api/movie-api";

const UserPage = () => {
  //const movies = props.movies;
  const { favourites: favIds } = useContext(MoviesContext);
  const { watchlist: watchlistIds } = useContext(MoviesContext);
  const numberOfFavs = favIds.length;
  const numberWatchlist = watchlistIds.length
 
  const isNonMobile = useMediaQuery("(min-width:650px)");

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
  const WatchlistIsLoading = wathclistMovieQueries.find((m) => m.isLoading === true);
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

  return (
    <>
      <UserDetails numberOfFavs={numberOfFavs} numberWatchlist={numberWatchlist} />
      <Divider></Divider>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          direction="row"
          alignItems="center"
          sx={{ paddingBottom: "10px" }}
        >
          <Divider sx={{mt: 5}}/>
          <Box
            paddingRight={isNonMobile ? 10 : 3}
            paddingLeft={isNonMobile ? 10 : 3}
            paddingTop={3}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ padding: "10px", mb: 1 }}
            >
              Favourite Movies
            </Typography>
            <MovieCarousel movies={favMovies}></MovieCarousel>
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
              Watchlist
            </Typography>
            <MovieCarousel movies={watchlistMovies}></MovieCarousel>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default UserPage;