import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

const RenderPage: React.FC = () => {
  return <MarkdownRenderer initialUrl="https://github.com/agdaily/github-reader" />;
};

export default RenderPage;
