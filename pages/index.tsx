import React from 'react';
import Head from 'next/head';
import Home from '../components/Home';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>GitHub Reader - Top Github Repository Browser and a better markdown reader</title>
        <meta name="description" content="Welcome to GitHub Reader, top github repository browser and a better markdown reading experience for github readme" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
