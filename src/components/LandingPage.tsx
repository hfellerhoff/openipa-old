import React from 'react';
import Hero from './landing-page/Hero';
import Description from './landing-page/Description';
import Demonstration from './landing-page/Demonstration';
import { RouteComponentProps } from 'react-router';
import './LandingPage.scss';
import Footer from './footer/Footer';

interface Props extends RouteComponentProps {}

const LandingPage: React.FC<Props> = () => {
  return (
    <>
      <div className='ipa__landing-page__container'>
        <Hero />
        <Description />
        <Demonstration />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
