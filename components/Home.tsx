import React from 'react';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo-container">
          <img src="/logo.svg" alt="Logo" className="logo" /> {/* Reference the logo directly */}
          <div className="site-title">GitHub Reader</div>
          <a
            href="https://github.com/agdaily/github-reader"
            target="_blank"
            rel="noopener noreferrer"
            className="github-icon"
            style={{marginLeft:8, color: 'black'}}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
      <Search />
    </div>
  );
};

export default Home;
