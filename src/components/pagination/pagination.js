import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function MoviePagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={50} color="primary" size="large" />
    </Stack>
  );
}