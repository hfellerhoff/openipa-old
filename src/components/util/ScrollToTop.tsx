import React from 'react';
import { withRouter } from 'react-router-dom';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Variables from '../../constants/Variables';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, Variables.fadeDuration);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
