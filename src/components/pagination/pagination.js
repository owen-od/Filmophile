import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function MoviePagination({ pageNumber, pageChange }) {
  const handleChange = (event, value) => {
    pageChange(value);
    // console.log(value);
  };

  return (
    <>
    <Stack spacing={2}>
      <Pagination
        count={100}
        color="primary"
        size="large"
        page={pageNumber}
        onChange={handleChange}
      />
    </Stack>
    </>
  );
}
