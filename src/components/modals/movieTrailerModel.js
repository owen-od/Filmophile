import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Box,
  CircularProgress,
  Button,
  Modal,
} from "@mui/material";
import { getTrailer } from "../../api/movie-api";
import "@fontsource/satisfy";
import ReactPlayer from "react-player";

const MovieTrailerModal = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrailerButtonClick = () => {
    setIsModalOpen(true);
  };

  const {
    data: trailerUrl,
    error,
    isLoading,
    isError,
  } = useQuery(["trailer", { id: movie.id }], getTrailer);

  if (isLoading) {
    return (
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <span>
        <p>Trailer N/A </p>
      </span>
    );
  }

  return (
    <>
      {trailerUrl ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            mt={1}
            onClick={() => handleTrailerButtonClick()}
            sx={{
              color: "text.main",
              borderRadius: 2,
              minWidth: "100px",
            }}
          >
            Watch Trailer
          </Button>
          <Modal
            open={isModalOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              <ReactPlayer url={trailerUrl} controls={true} />
            </Box>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default MovieTrailerModal;
