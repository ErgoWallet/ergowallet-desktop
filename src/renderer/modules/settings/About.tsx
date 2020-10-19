import * as React from 'react';
import {Box} from "@material-ui/core";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../../../../package.json');

function About () {
  return (
    <Box>
      <Box>Ergo Wallet v{pkg.version}</Box>
      <Box>
        App Icon made by <a href="https://www.flaticon.com/authors/good-ware" rel="noreferrer" target="_blank" title="Good Ware">Good Ware</a> from <a rel="noreferrer" target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </Box>
    </Box>
  );
}

export default About;
