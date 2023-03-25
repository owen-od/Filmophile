import React from "react";
import { useQuery } from "react-query";
import {
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { getStreaming } from "../../api/movie-api";
import { RiNetflixFill } from "react-icons/ri";
import { SiPrime } from "react-icons/si";
import { CgUnavailable } from "react-icons/cg";
import { useState } from "react";

const StreamingDetails = ({ movie }) => {
  const [open, setOpen] = useState(false); // state for opening/closing the dialog

  const {
    data: streamingData,
    error,
    isLoading,
    isError,
  } = useQuery(["streaming", { id: movie.id }], getStreaming);

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
        <p>N/A </p>
      </span>
    );
  }

  const providers = [];
  if (streamingData.results.IE) {
    if (streamingData.results.IE.flatrate) {
      const streaming = streamingData.results.IE.flatrate;
      streaming.forEach((p) => {
        providers.push(p.provider_name);
      });
    }
  }

  //set supported streaming providers and then check if returned array in includes any of these
  const supportedStreamingProviders = [
    "Disney Plus",
    "Amazon Prime Video",
    "Netflix",
  ];
  const isStreaming = supportedStreamingProviders.some((provider) =>
    providers.includes(provider)
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography onClick={handleOpen} style={{ cursor: "pointer" }}>
          Streaming on:{" "}
        </Typography>
        <Box>
          {providers.includes("Netflix") && (
            <IconButton sx={{ color: "red" }}>
              <RiNetflixFill />
            </IconButton>
          )}
          {providers.includes("Amazon Prime Video") && (
            <IconButton sx={{ color: "blue", fontSize: "2rem" }}>
              <SiPrime />
            </IconButton>
          )}
          {providers.includes("Disney Plus") && (
            <IconButton sx={{ color: "black" }}>
              <Typography sx={{ fontSize: "1.1rem", fontFamily: "Satisfy" }}>
                Disney+
              </Typography>
            </IconButton>
          )}
          {!isStreaming && (
            <IconButton sx={{ color: "black", fontSize: "1.25rem" }}>
              <CgUnavailable />
            </IconButton>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Streaming Providers</DialogTitle>
        <DialogContent>
          <Typography>
            We currently offer support for Netflix, Amazon Prime and Disney+.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default StreamingDetails;
