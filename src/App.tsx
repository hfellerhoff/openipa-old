import React from 'react';
import LandingPage from './components/LandingPage';
import Navbar from './components/header/Navbar';
import TranscriptionPage from './components/TranscriptionPage';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Footer from './components/footer/Footer';
import './app.scss';
import './styles/reset.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route default exact path='/' component={LandingPage} />
      <Route path='/:language' component={TranscriptionPage} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
