import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../../../../package.json');

function About () {
  return (
    <>
      <div>Ergo Wallet v{pkg.version}</div>
      <div>
        App Icon made by <a href="https://www.flaticon.com/authors/good-ware" rel="noreferrer" target="_blank" title="Good Ware">Good Ware</a> from <a rel="noreferrer" target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </>
  );
}

export default About;
