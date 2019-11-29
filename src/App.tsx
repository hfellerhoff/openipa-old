import React from 'react';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar/Navbar';
import TranscriptionPage from './pages/TranscriptionPage';
import { Route, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import './app.scss';
import './reset.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path='/' component={LandingPage} />
      <Route path='/:language' component={TranscriptionPage} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
