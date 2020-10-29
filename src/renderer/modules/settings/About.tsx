import * as React from 'react';
import {Box, Button, Link} from "@material-ui/core";
import { shell } from 'electron';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../../../../package.json');

function About () {
  const handleReportClick = () => {
    shell.openExternal('https://github.com/ErgoWallet/ergowallet-desktop/issues/new');
  };

  return (
    <Box>
      <Box>Ergo Wallet v{pkg.version}</Box>
      <Box mt={1}>
        <Link onClick={handleReportClick} href="#" variant="body2">
          Report an issue
        </Link>
      </Box>
    </Box>
  );
}

export default About;
