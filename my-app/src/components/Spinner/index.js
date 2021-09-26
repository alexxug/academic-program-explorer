import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{
      position: 'fixed',
      top: '50%',
      left: '50%'
    }}>

      <CircularProgress />
    </Box>
  );
}