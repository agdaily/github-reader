# Github Reader

Welcome to [GithubReader](https://githubreader.org/)! A top github repository browser, and read GitHub Markdown files as if you were reading a book. It's perfect for those who seek a clean, focused reading experience for reading and learning purposes. The app doesn't host any data; everything is fetched directly in the browser at the user's request.

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
- add dark theme support

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

This project is licensed under the Apache License 2.0 License. For more details, see the [LICENSE](LICENSE) file.