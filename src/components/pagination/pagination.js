import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function MoviePagination({ pageNumber, pageChange }) {
  const handleChange = (event, value) => {
    //change page
    pageChange(value);
    // Add a smooth scroll effect and go back to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <Stack spacing={2}>
      <Pagination
        count={50}
        color="primary"
        size="large"
        page={pageNumber}
        onChange={handleChange}
      />
    </Stack>
    </>
  );
}
