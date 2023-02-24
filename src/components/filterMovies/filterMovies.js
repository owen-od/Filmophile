import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import { getGenres } from "../../api/movie-api";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

function FilterMovies(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <div>
      <Accordion sx={{ minWidth: "280px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Filter Movies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <TextField
              id="filled-search"
              label="Search movies"
              type="search"
              variant="outlined"
              sx={{ minWidth: "250px" }}
            />
          </Box>
          <Box sx={{ minWidth: "250px" }}>
            <FormControl sx={{ minWidth: "250px", marginTop: 1 }}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select labelId="genre-label" id="genre-select" label="genre" value={props.genreFilter} onChange={handleGenreChange}>
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ minWidth: "250px", marginTop: 1 }}>
              <InputLabel id="genre-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                id="rating-select"
                label="rating"
                minWidth="200px"
              >
                {ratings.map((rating) => {
                  return (
                    <MenuItem key={rating} value={rating} minWidth="200px">
                      {rating}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 1, minWidth: "280px", }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h5">Sort Movies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel id="sort-label">Sort Option</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              label="sort option"
              value=""
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="release_date">Release Date</MenuItem>
              );
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default FilterMovies;
