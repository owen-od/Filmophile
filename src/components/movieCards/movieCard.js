import * as React from "react";
import { useContext } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/moviesContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserAuth } from "../../context/AuthContext";
import { useMediaQuery } from "@mui/material";

export default function MovieCard(movie) {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(MoviesContext);

  const isNonMobile = useMediaQuery("(min-width:450px)");

  const { user } = UserAuth();

  const handleAddToFavourites = (movie) => {
    if (!user) {
      alert("Please log in to add movies to favourites");
    } else {
      addToFavourites(movie);
      console.log(favourites);
    }
  };

  const handleRemoveFromFavourites = (movie) => {
    removeFromFavourites(movie);
    console.log(favourites);
  };

  return (
    <CssVarsProvider>
      <Card variant="outlined" sx={{ width: isNonMobile ? 255 : 235 }}>
        <Grid>
          <Grid item xs={11}>
            <Typography
              level="h3"
              fontSize="sm"
              sx={{
                mb: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {movie.movie.title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {!favourites.includes(movie.movie.id) ? (
              <IconButton
                aria-label="favourite"
                variant="outlined"
                color="white"
                size="sm"
                onClick={() => handleAddToFavourites(movie.movie)}
                sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
              >
                <FavoriteBorderIcon sx={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton
                aria-label="favourite"
                variant="filled"
                color="secondary"
                size="sm"
                onClick={() => handleRemoveFromFavourites(movie.movie)}
                sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
              >
                <FavoriteIcon sx={{ color: "red", fontSize: "1.6rem" }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <AspectRatio
          minHeight="15rem"
          maxHeight="300px"
          objectFit="fill"
          sx={{ my: 2 }}
        >
          <img
            src={
              movie.movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.movie.poster_path}`
                : `${process.env.PUBLIC_URL}/assets/poster-placeholder.png`
            }
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography level="body3">Released:</Typography>
            <Typography fontSize="md" fontWeight="md">
              {movie.movie.release_date}
            </Typography>
          </div>

          <Button
            component={Link}
            to={`/movies/${movie.movie.id}`}
            variant="outlined"
            size="sm"
            color="neutral"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 }}
          >
            More info
          </Button>
        </Box>
      </Card>
    </CssVarsProvider>
  );
}
