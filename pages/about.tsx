import React from 'react';
import Head from 'next/head';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <Head>
        <title>About - GitHub Reader</title>
        <meta name="description" content="Learn more about GitHub Reader, a tool for viewing GitHub markdown files in a reader-friendly format." />
      </Head>
      <h1>About GitHub Reader</h1>
      <p>
        GitHub Reader is a top github repository browser that also allows users to view GitHub markdown files in a reader-friendly format. Whether you are browsing documentation,
        reading a README file, or exploring a project's wiki, GitHub Reader makes it easy to read and navigate through markdown content.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Supports dark mode and Kindle-like reading mode for a better reading experience.</li>
        <li>Search functionality to quickly find repositories and markdown files.</li>
        <li>Responsive design for a seamless experience on both desktop and mobile devices.</li>
      </ul>
      <h2>How It Works</h2>
      <p>
        GitHub Reader fetches the raw markdown content from GitHub and renders it using a custom React component. The application supports various markdown
        features, including code blocks, tables, images, and links. Users can navigate through different sections of a markdown file using internal links.
      </p>
      <h2>Contributing</h2>
      <p>
        GitHub Reader is an open-source project. We welcome contributions from the community. If you would like to contribute, please visit our
        <a href="https://github.com/agdaily/github-reader" target="_blank" rel="noopener noreferrer"> GitHub repository</a> for more information on how to get involved.
      </p>
    </div>
  );
};

export default About;
