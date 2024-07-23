import { fetchReadmeHtmlUrl } from './githubApi';
export const convertToRawMarkdownUrl = (url: string): string => {
    // console.log("converting to raw url", url);
    url = buildReadmeUrlFromRepoUrl(url)
    if (url.includes('github.com') && url.includes('/blob/')) {
      return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    // Handling URLs without '/blob/'
    if (url.includes('github.com') && url.includes(".md")) {
        const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/(.*)/;
        const match = url.match(regex);
        if (match) {
            const owner = match[1];
            const repo = match[2];
            const path = match[3];
            return `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}`;
        }
    }
    return url;
  };
  
  export const convertToGithubUrl = (url: string): string => {
    if (url.includes('raw.githubusercontent.com')) {
      return url.replace('raw.githubusercontent.com', 'github.com').replace(/\/([^\/]*)$/, '/blob/$1');
    }
    return url;
  };

  /**
 * Extracts the title from a URL and formats it.
 * @param url - The URL to extract the title from.
 * @returns The formatted title.
 */
 export const extractTitleFromUrl = (url: string): string => {
    const regex = /([^\/]+\.md)/;
    const match = url.match(regex);
    let title;
    if (match) {
      title = match[1].replace(/\.md$/, '').replace(/[-_]/g, ' ');
      title = title.replace(/\b\w/g, char => char.toUpperCase());
    } else {
        const params = extractGithubParams(url);
        title = params?.repo.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

    return title??'Document';
  };

  
  /**
   * Extracts owner, repo, and branch from a GitHub URL.
   * @param url - The GitHub URL.
   * @returns An object containing owner, repo, and branch.
   */
   export const extractGithubParams = (url: string) => {
        // Ensure the URL is converted to a GitHub URL if necessary
        url = convertToGithubUrl(url);
    
        const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?.*/;
        const match = url.match(regex);
        if (match) {
        return {
            owner: match[1],
            repo: match[2],
            branch: 'master' //github redirects to main automatically
        };
        }
        return null;
  };

  export const buildGithubURLFromRelativeUrl = (currentUrl: string, relativeUrl: string): string => {    
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/(.*)/;
    const match = currentUrl.match(regex);
    if (match) {
        const owner = match[1];
        const repo = match[2];
        const path = match[3];
        if(!path.startsWith('tree') || !path.startsWith('blob')) {
          currentUrl = `https://github.com/${owner}/${repo}/tree/main/${path??"README.md"}`
        }
    }
    return new URL(relativeUrl, currentUrl).toString();
  };
  
  /**
   * Constructs the complete URL for raw image content on GitHub.
   * @param owner - The owner of the GitHub repository.
   * @param repo - The name of the GitHub repository.
   * @param branch - The branch where the file is located.
   * @param relativePath - The relative path to the image file within the repository.
   * @returns The complete URL of the raw image content.
   */
  export const getGithubRawImageUrl = (owner: string, repo: string, branch: string, relativePath: string): string => {
    const baseUrl = "https://raw.githubusercontent.com";
    return `${baseUrl}/${owner}/${repo}/${branch}/${relativePath}`;
  };



  export const buildReadmeUrlFromRepoUrl = (url: string): string => {
    const regex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
  
    // If the URL matches the specific cases, append '/blob/master/README.md'
    if (regex.test(url)) {
      url = url.replace(/\/?$/, '/blob/master/README.md');
    }
  
    // Remove double slashes, if any, after appending
    url = url.replace(/([^:]\/)\/+/g, "$1");
  
    return url;
  };

  export const getReadmeURLFromAPI = async (url: string): Promise<string> => {
    const params = extractGithubParams(url);
    if (params) {
        const readmeURL = await fetchReadmeHtmlUrl(params?.owner, params?.repo);
        return readmeURL??url;
    } else {
        console.log("Couldn't find repo owner and repo slug from url", url);
    }
  
    return url;
  };
  
  