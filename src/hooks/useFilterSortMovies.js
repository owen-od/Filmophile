import { useState, useEffect } from "react";

export const useDisplayedMovies = (movies) => {
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [textFilter, setTextFilter] = useState("");
  const [movieSorter, setmovieSorter] = useState("title");
  const genreId = Number(genreFilter);

  const [displayedMovies, setDisplayedMovies] = useState(movies);

  useEffect(() => {
    const filteredMovies = movies
      .filter((m) => {
        return genreId > 0 ? m.genre_ids.includes(genreId) : true;
      })
      .filter((m) => {
        return m.title.toLowerCase().search(textFilter.toLowerCase()) !== -1;
      })
      .filter((m) => {
        return m.vote_average > ratingFilter;
      })
      .sort((a, b) => {
        if (movieSorter === "release_date_desc") {
          return a["release_date"].localeCompare(b["release_date"]);
        } else if (movieSorter === "release_date_asc") {
          return b["release_date"].localeCompare(a["release_date"]);
        } else if (movieSorter === "rating_desc") {
          return b["vote_average"] - a["vote_average"];
        } else if (movieSorter === "rating_asc") {
          return a["vote_average"] - b["vote_average"];
        } else {
          return 0;
        }
      });
      setDisplayedMovies(filteredMovies);
  }, [movies, genreId, textFilter, ratingFilter, movieSorter]);

  const handleChange = (type, value) => {
    if (type === "rating") {
      setRatingFilter(value);
    } else if (type === "text") {
      setTextFilter(value);
    } else if (type === "sort") {
      setmovieSorter(value);
    } else {
      setGenreFilter(value);
    }
  };

  return { displayedMovies, genreFilter, ratingFilter, textFilter, movieSorter, genreId, handleChange };
};
