import * as React from 'react';
import {Box} from "@material-ui/core";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../../../../package.json');

function About () {
  return (
    <Box>
      <Box>Ergo Wallet v{pkg.version}</Box>
    </Box>
  );
}

export default About;
