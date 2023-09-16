import { Box } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';

interface HexProps {
  backgroundColor?: any;
  
}

function Hex(props: PropsWithChildren<HexProps>): React.ReactElement {
  const { children, backgroundColor } = props;
  return (
    <Box component={"span"} sx={{backgroundColor: backgroundColor, fontFamily: '"Roboto Mono", monospace'}}>
      {children}
    </Box>
    );
}

export default Hex;
