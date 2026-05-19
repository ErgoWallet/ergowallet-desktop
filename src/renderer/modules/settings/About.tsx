import * as React from 'react';
import {Box, Link} from "@mui/material";
// import {shell} from 'electron';
import version from '../app/version';

function About() {
  const handleReportClick = () => {
    //shell.openExternal('https://github.com/ErgoWallet/ergowallet-desktop/issues/new');
  };

  return (
    <Box>
      <Box>Ergo Wallet v{version}</Box>
      <Box mt={1}>
        <Link onClick={handleReportClick} href="#" variant="body2">
          Report an issue
        </Link>
      </Box>
    </Box>
  );
}

export default About;
