import React from 'react';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from './logo.svg'; // Adjust the path if necessary
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <div className="site-title">Github Reader</div>
        </div>
      </div>
      <Search />
    </div>
  );
};

export default Home;
