import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Warning({ warning }) {
  const { type, message } = warning;
  return (
    <Stack sx={{ width: '100%', position: 'absolute' }} spacing={2}>
      <Alert severity={type}>{message}</Alert>
    </Stack>
  );
}
