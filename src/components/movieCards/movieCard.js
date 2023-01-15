import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '@fontsource/public-sans';
import { CssVarsProvider } from '@mui/joy/styles';
import Grid from '@mui/material/Grid';

export default function MovieCard(movie) {
  return (
    <CssVarsProvider>
      <Card variant="outlined" sx={{ width: 215 }}>
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
            <IconButton
              aria-label="favourite"
              variant="outlined"
              color="primary"
              size="sm"
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            >
              <FavoriteBorderIcon />
            </IconButton>
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
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
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
            variant="outlined"
            size="sm"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 , backgroundColor: "secondary"}}
          >
            More info
          </Button>
        </Box>
      </Card>
    </CssVarsProvider>
  );
}