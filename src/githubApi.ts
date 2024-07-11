import axios from 'axios';

export interface GitHubRepo {
  full_name: string;
  html_url: string;
  stargazers_count: number;
}

export const searchGitHubRepos = async (query: string): Promise<GitHubRepo[]> => {
  if (query.length < 3) return [];

  try {
    const response = await axios.get(`https://api.github.com/search/repositories`, {
      params: {
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: 20,
      },
    });

    return response.data.items.map((repo: any) => ({
      full_name: repo.full_name,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
    }));
  } catch (error) {
    console.error('Error fetching from GitHub API:', error);
    return [];
  }
};
