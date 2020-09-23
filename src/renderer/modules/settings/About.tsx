import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../../../../package.json');

function About () {
  return (
    <>
      Ergo Wallet v{pkg.version}
    </>
  );
}

export default About;
