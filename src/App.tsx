import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MarkdownRenderer from './MarkdownRenderer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/render" element={<MarkdownRenderer initialUrl="" />} />
      </Routes>
    </Router>
  );
};

export default App;
