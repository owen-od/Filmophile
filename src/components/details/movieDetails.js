import React from "react";
import {
  Typography,
  Grid,
  Box,
  useMediaQuery,
  Button,
  IconButton,
  ListItem,
  List,
  Stack,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MovieIcon from "@mui/icons-material/Movie";
import Chip from "@mui/material/Chip";

const MovieDetails = ({ movie }) => {
  const backgroundImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : `${process.env.PUBLIC_URL}/assets/background-placeholder.jpg`;

  return (
    <Box
      marginTop="50px"
      padding="30px 0"
      position="relative"
      sx={{
        "&::after": {
          content: "''",
          backgroundImage: `url(${backgroundImage})`,
          position: "absolute",
          backgroundSize: "cover",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          opacity: 0.1,
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
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
            height="500"
            margin="auto"
            border="10"
          />
        </Box>

        <Box flex="1 1 50%" mb="40px">
          <Box m="40px 0 25px 0">
            <Typography variant="h3">
              {movie.title}
            </Typography>
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
                    label={g.name}
                    color="secondary"
                    sx={{ marginRight: 0.5 }}
                  />
                ))}
              </ListItem>
            </List>
            <Paper elevation={3}>
              <Typography
                sx={{
                  mt: "20px",
                  border: "hidden",
                  padding: 1,
                  overflowY: "scroll",
                  overflowX: "hidden",
                  textOverflow: "scroll",
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
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography>Streaming on: </Typography>
              <Box>
                <IconButton>
                  <MovieIcon />
                </IconButton>
                <IconButton>
                  <MovieIcon />
                </IconButton>
                <IconButton>
                  <MovieIcon />
                </IconButton>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: "white",
                borderRadius: 2,
                minWidth: "100px",
                padding: "10px 20px",
              }}
            >
              Add to Watchlist
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MovieDetails;