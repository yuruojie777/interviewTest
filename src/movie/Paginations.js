import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={0} position='fixed' top={80} right={0} width='10vw'>
      {/* <Pagination count={10} shape="rounded" /> */}
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}