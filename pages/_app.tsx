import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/Home.css';
import '../public/Search.css';
import '../public/MarkdownRenderer.css';
import '../public/Themes.css';
import '../public/about.css';

import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faHome, faMoon, faSun, faBook } from '@fortawesome/free-solid-svg-icons';
// See https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
  faGithub, faArrowLeft, faHome, faMoon, faSun, faBook
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>GitHub Reader</title>
        <meta name="description" content="GitHub Reader is a top github repository browser and allows users to view GitHub markdown files in a reader-friendly format." />
        <meta name="keywords" content="GitHub, Markdown, Reader, GitHub Reader, Open Source, top github repository browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
