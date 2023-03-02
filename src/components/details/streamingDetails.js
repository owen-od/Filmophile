import React from "react";
import { useQuery } from "react-query";
import { Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { getStreaming } from "../../api/movie-api";
import { RiNetflixFill } from "react-icons/ri";
import { SiPrime } from "react-icons/si";
import { CgUnavailable } from "react-icons/cg";
import "@fontsource/satisfy";

const StreamingDetails = ({ movie }) => {
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
  console.log("streaming: " + providers);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography>Streaming on: </Typography>
      <Box>
        {providers.includes("Netflix") ? (
          <IconButton sx={{ color: "red" }}>
            <RiNetflixFill />
          </IconButton>
        ) : (
          <></>
        )}
        {providers.includes("Amazon Prime Video") ? (
          <IconButton sx={{ color: "blue", fontSize: "2rem" }}>
            <SiPrime />
          </IconButton>
        ) : (
          <></>
        )}
        {providers.includes("Disney Plus") ? (
          <IconButton sx={{ color: "black" }}>
            <Typography sx={{ fontSize: "1.1rem", fontFamily: "Satisfy" }}>
              Disney+
            </Typography>
          </IconButton>
        ) : (
          <></>
        )}
        {providers.length === 0 ? (
          <IconButton sx={{ color: "black", fontSize: "1.25rem" }}>
            <CgUnavailable />
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
export default StreamingDetails;
