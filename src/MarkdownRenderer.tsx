import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import CodeBlock from './CodeBlock';
import './MarkdownRenderer.css';
import './Themes.css';
import { convertToRawMarkdownUrl, extractGithubParams, extractTitleFromUrl, getGithubRawImageUrl, getReadmeURLFromAPI } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome, faMoon, faSun, faBook } from '@fortawesome/free-solid-svg-icons';

const MarkdownRenderer: React.FC<{ initialUrl: string }> = ({ initialUrl }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>(initialUrl);
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'system');
  const navigate = useNavigate();
  const location = useLocation();
  const title = extractTitleFromUrl(currentUrl);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const preferredTheme = theme === 'system' ? systemTheme : theme;
    document.documentElement.setAttribute('data-theme', preferredTheme);
  }, [theme]);

  const fetchMarkdown = async (url: string) => {
    const rawUrl = convertToRawMarkdownUrl(url);
    try {
      const response = await axios.get(rawUrl);
      setMarkdown(response.data);
      setHistoryStack((prevStack) => [...prevStack, url]);
      setCurrentUrl(url);
    } catch (error: any) {
      if (error.response && error.response.status === 404 && rawUrl.toLowerCase().includes('readme.md')) {
        const readmeUrl = await getReadmeURLFromAPI(url);
        console.log("readme url from api is", readmeUrl);
        if (readmeUrl) {
          fetchMarkdown(readmeUrl);
        } else {
          console.error('README URL could not be fetched from GitHub API.');
        }
      } else {
        console.error('Error fetching the markdown file:', error);
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url') || initialUrl;
    if (url) {
      fetchMarkdown(url);
    }
  }, [location.search, initialUrl]);

  const handleLinkClick = (href: string) => {
    if (href.includes(".md#") || href.startsWith("#")) {
      const element = document.getElementById(href.split("#")[1]);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const baseUrl = new URL(currentUrl);
    const isRelativeLink = !href.startsWith('http');
    const resolvedUrl = isRelativeLink 
      ? `${baseUrl.origin}${baseUrl.pathname.match(/\.md(\/|#|$)/) ? baseUrl.pathname.replace(/[^/]+$/, '') : baseUrl.pathname}/${href}`
          .toString()
          .replace(/([^:]\/)\/+/g, "$1")
      : href;    
    const isGithubLink = resolvedUrl.includes('github.com') || resolvedUrl.includes('raw.githubusercontent.com');

    if (isGithubLink && convertToRawMarkdownUrl(resolvedUrl).includes(".md")) {
      setMarkdown(''); // Clear current markdown to show loading state if needed
      navigate(`/render?url=${encodeURIComponent(resolvedUrl)}`);
    } else {
      window.open(resolvedUrl, '_blank');
    }
  };

  const handleBackClick = () => {
    if (historyStack.length > 1) {
      setHistoryStack((prevStack) => {
        const newStack = [...prevStack];
        newStack.pop();
        const previousUrl = newStack[newStack.length - 1];
        fetchMarkdown(previousUrl);
        return newStack;
      });
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'kindle' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={handleBackClick} className="chevron-button">
          <FontAwesomeIcon icon={historyStack.length > 1 ? faArrowLeft : faHome} />
        </button>
        <div className="title">{title}</div>
        <button onClick={toggleTheme} className="theme-button">
          <FontAwesomeIcon icon={theme === 'dark' ? faBook : theme === 'light' ? faMoon : faSun} />
        </button>
        <a href={currentUrl} className="github-link" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
      <ReactMarkdown
        children={markdown}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        remarkPlugins={[remarkGfm, remarkEmoji]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a href={href} onClick={(e) => { e.preventDefault(); if (href) handleLinkClick(href); }}>
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            const githubParams = extractGithubParams(currentUrl);
            let resolvedSrc = src;
          
            if (githubParams && src && !src.startsWith('http')) {
              resolvedSrc = getGithubRawImageUrl(githubParams.owner, githubParams.repo, githubParams.branch, src);
            }
          
            return <img src={resolvedSrc} alt={alt} />;
          },
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
