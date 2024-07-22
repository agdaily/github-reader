import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { searchGitHubRepos, GitHubRepo } from './githubApi';

interface Repository {
  title: string;
  tags: string[];
  url: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Repository[]>([]);
  const [githubResults, setGitHubResults] = useState<GitHubRepo[]>([]);
  const [data, setData] = useState<Repository[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/db.json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the db.json file:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback(debounce(async (value: string) => {
    if (value.length >= 3) {
      const gitHubRepos = await searchGitHubRepos(value);
      setGitHubResults(gitHubRepos);
    } else {
      setGitHubResults([]);
    }
  }, 500), []);

  useEffect(() => {
    const filteredResults = data.filter(
      (repo) =>
        repo.title.toLowerCase().includes(query.toLowerCase()) ||
        repo.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
        repo.url.toLowerCase().includes(query.toLowerCase())
    );
    if (query){
        setResults([])
        // Uncomment below line and fill db.json if GitHub public API is no longer available or is very slow
        // setResults(filteredResults);
    } else {
        setResults([])
    }

    if (query.length >= 3) {
      handleSearch(query);
    } else {
      setGitHubResults([]);
    }
  }, [query, data, handleSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleResultClick = (url: string) => {
    router.push(`/render?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search or enter markdown URL. Try system design ..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        {
            query.includes("https") && 
            <button onClick={() => handleResultClick(query)} disabled={!query.includes("https")} className="search-button">
            Read
          </button>
        }
      </div>
      {(results.length > 0 || githubResults.length > 0) && (
        <div className="search-results">
          {results.map((repo, index) => (
            <div key={index} className="search-result" onClick={() => handleResultClick(repo.url)}>
              <h3>{repo.title}</h3>
              <p>{repo.url}</p>
              {/* <p>{repo.tags.join(', ')}</p> */}
            </div>
          ))}
          {githubResults.map((repo, index) => (
            <div key={index} className="search-result" onClick={() => handleResultClick(repo.html_url)}>
              <h3>{repo.full_name}</h3>
              <p>{repo.html_url}</p>
              <p>⭐ {repo.stargazers_count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
