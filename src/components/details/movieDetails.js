import React from "react";
import { useContext } from "react";
import {
  Typography,
  Box,
  Button,
  ListItem,
  List,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";
import { MoviesContext } from "../../context/moviesContext";
import { UserAuth } from "../../context/AuthContext";
import StreamingDetails from "./streamingDetails";
import MovieTrailerModal from "../modals/movieTrailerModel";

const MovieDetails = ({ movie }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(MoviesContext);
  const { user } = UserAuth();

  const handleAddToWatchlist = (movie) => {
    if (!user) {
      alert("Please log in to add movies to watchlist");
    } else {
      addToWatchlist(movie);
    }
  };

  const handleRemoveFromWatchlist = (movie) => {
    removeFromWatchlist(movie);
    console.log(watchlist);
  };

  const backgroundImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : `${process.env.PUBLIC_URL}/assets/background-placeholder.jpg`;

  return (
    <Box
      padding="30px 0"
      position="relative"
      sx={{
        "&::before": {
          content: "''",
          backgroundImage: `url(${backgroundImage})`,
          position: "absolute",
          backgroundSize: "cover",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          opacity: 0.1,
          zIndex: -1,
        },
      }}
    >
      <Box
        width="clamp(70%, 80%, 90%)"
        margin="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        columnGap="20px"
      >
        <Box flex="1 1 10%" mb="20px" sx={{ textAlign: "center" }}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : `${process.env.PUBLIC_URL}/assets/poster-placeholder.png`
            }
            loading="lazy"
            alt=""
            height="500"
            margin="auto"
            border="10"
          />
        </Box>

        <Box flex="1 1 50%" mb="40px">
          <Box m="40px 0 25px 0">
            <Typography variant="h3">{movie.title}</Typography>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mt: "5px" }}
            >
              <StarIcon />
              {movie.vote_average} ({movie.vote_count} votes)
            </Typography>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mt: "5px" }}
            >
              <AccessTimeIcon />
              {movie.runtime} mins
            </Typography>
            <List
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <ListItem sx={{ paddingLeft: 0, paddingBottom: 0 }}>
                {movie.genres.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    color="secondary"
                    sx={{ marginRight: 0.5 }}
                  />
                ))}
              </ListItem>
            </List>
            <MovieTrailerModal movie={movie} />
            <Paper elevation={3} sx={{ opacity: 0.8 }}>
              <Typography
                sx={{
                  mt: "10px",
                  border: "hidden",
                  padding: 1,
                  overflowY: "scroll",
                  overflowX: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "6",
                  WebkitBoxOrient: "vertical",
                  "&::-webkit-scrollbar": {
                    width: "0.5em",
                  },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                    outline: "1px solid slategrey",
                  },
                }}
              >
                {movie.overview}
              </Typography>
            </Paper>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            minHeight="50px"
          >
            <StreamingDetails movie={movie} />
            {!watchlist.includes(movie.id) ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAddToWatchlist(movie)}
                sx={{
                  color: "white",
                  borderRadius: 2,
                  minWidth: "100px",
                  padding: "10px 20px",
                }}
              >
                Add to Watchlist
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveFromWatchlist(movie)}
                sx={{
                  color: "white",
                  borderRadius: 2,
                  minWidth: "100px",
                  padding: "10px 20px",
                }}
              >
                Remove from Watchlist
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MovieDetails;
