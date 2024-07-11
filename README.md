# Github Reader

Welcome to [GithubReader](https://githubreader.org)! This project allows you to view Markdown files from GitHub repositories without the extra GitHub UI. It's perfect for those who seek a clean, focused reading experience for reading/learning purpose. The app doesn't host any data; everything is fetched directly in the browser at the user's request. 

The motivation came from need to read some of the best learning repositories out there in a distraction free maanner. Example 

## How It Works

The app leverages the GitHub API to fetch Markdown files from public repositories and presents them in a streamlined, easy-to-read format. Here’s how it works:

1. **Enter URL or Search**: Input a GitHub repository or any github markdown URL or search for repositories using keywords. Try "system design", "data engineering"... 
2. **Fetch Markdown**: The app retrieves the raw Markdown content from the specified repository.
3. **Render Content**: The Markdown is displayed in a clean, distraction-free format.
4. **Direct URL Sharing**: You can also directly access specific Markdown files by appending `?url=` with the file's URL. For example: https://githubreader.org/render?url=https://github.com/user/repo/blob/main/README.md This will open the specified Markdown file in the reader.

## Features

- **Clean Reading Experience**: Strips away GitHub’s UI to provide a distraction-free reading environment.
- **Live Search**: Search for repositories and view their Markdown files instantly.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Client-Side Only**: All data is fetched on the client-side; no data is stored or processed server-side.

## TODOs
- Fix markdown anchor navigation

## Usage

You can use Github Reader directly at [GithubReader.org](https://githubreader.org).

1. **Enter URL or Search**: Visit the home page, enter a GitHub repository URL, or search using keywords.
2. **View Markdown**: Select the repository you want to read, and the app will fetch and display its Markdown content.
3. **Navigate Links**: Click on links within the Markdown to view other documents or images in the repository. Use the back button to return or the home button to start a new search.
4. **Direct URL Sharing**: You can also directly access specific Markdown files by appending `?url=` with the file's URL. For example: https://githubreader.org/render?url=https://github.com/user/repo/blob/main/README.md This will open the specified Markdown file in the reader.


## Installation (For Contributors)

If you want to run Github Reader locally and contribute to the project, follow these steps:

1. **Install dependencies**:
    ```bash
    yarn install
    ```
2. **Start the development server**:
    ```bash
    yarn start
    ```

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

## Acknowledgements

- Most of the initial code is written by ChatGPT, including this Readme.
- This project is powered by [React](https://reactjs.org/).
- Markdown rendering is handled by [React Markdown](https://github.com/remarkjs/react-markdown).
- Syntax highlighting is provided by [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter).

## Disclaimer

Github Reader is an independent, non-profit project not affiliated with or endorsed by GitHub, Inc. Project's goal is to enhance the reading experience by providing a cleaner way to view GitHub Markdown content. No data is stored or hosted by the app; all data is fetched directly from GitHub at user's request.
