import * as React from 'react';
import {Box, CircularProgress, Container} from '@material-ui/core';

const Loading = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Box>
          <CircularProgress/>
        </Box>
        <Box>
          Happiness is loading...
        </Box>
      </Box>
    </Container>
  );
}

export default Loading;