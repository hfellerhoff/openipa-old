import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import LandingPage from './components/LandingPage';
import SupportPage from './components/SupportPage';
import TranscriptionPage from './components/TranscriptionPage';
import Footer from './components/footer/Footer';
import './app.scss';
import './styles/reset.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route default exact path='/' component={LandingPage} />
      <Route path='/support' component={SupportPage} />
      <Route path='/transcription/:language' component={TranscriptionPage} />
    </BrowserRouter>
  );
};

export default App;
