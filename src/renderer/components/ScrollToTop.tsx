import * as React from 'react';

export const ScrollToTop = ({ location }) => {
  React.useEffect(() => {
      window.scrollTo(0, 0);
    },
    [location.pathname]
  );
  return null;
};
