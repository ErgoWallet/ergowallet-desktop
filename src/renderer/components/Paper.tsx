import * as React from 'react';
import {Paper as MuiPaper, useTheme} from '@mui/material';

function Paper (props: any) {
  const theme = useTheme();
  const paper = {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
  const { children } = props;
  return (
    <MuiPaper
      variant="outlined"
      square={true}
      sx={paper}
    >
      {children}
    </MuiPaper>
  );
}

export default Paper;
