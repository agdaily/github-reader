import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/Home.css';
import '../public/Search.css';
import '../public/MarkdownRenderer.css';
import '../public/Themes.css';
import '../public/about.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>GitHub Reader</title>
        <meta name="description" content="GitHub Reader is a top github repository browser and allows users to view GitHub markdown files in a reader-friendly format." />
        <meta name="keywords" content="GitHub, Markdown, Reader, GitHub Reader, Open Source, top github repository browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
