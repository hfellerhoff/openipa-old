import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import LandingPage from './components/LandingPage';
import SupportPage from './components/SupportPage';
import TranscriptionPage from './components/TranscriptionPage';
import './app.scss';
import './styles/reset.scss';
import { useTransition, animated } from 'react-spring';
import Variables from './constants/Variables';

const App = () => {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: Variables.fadeDuration },
  });

  return transitions.map(({ item: location, props, key }) => (
    <>
      <Navbar />
      <animated.div key={key} style={props}>
        <Switch location={location}>
          <Route default exact path='/' component={LandingPage} />
          <Route path='/support' component={SupportPage} />
          <Route
            path='/transcription/:language'
            component={TranscriptionPage}
          />
        </Switch>
      </animated.div>
    </>
  ));
};

export default App;
