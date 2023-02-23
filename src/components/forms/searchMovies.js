import React from "react";
import {
  TextField,
  Grid,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const MovieSearch = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data.search)
    props.searchMovies(data.search);
  };

  return (
    <>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="search"
            name="search"
            variant="outlined"
            margin="normal"
            required
            placeholder="Search Movies"
            color="primary"
            focused
            label="search"
            {...register("search")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button type="submit" variant="contained" color="primary">
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {errors && (
            <Typography variant="h6" component="p">
              {errors.message}
            </Typography>
          )}
        </form>
      </Grid>
    </>
  );
};

export default MovieSearch;
