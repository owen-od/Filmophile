import React from "react";
import { TextField, Grid, Button, InputAdornment } from "@mui/material";

const MovieSearch = () => {
  return (
    <>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <form>
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
        </form>
      </Grid>
    </>
  );
};

export default MovieSearch;
