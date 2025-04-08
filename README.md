# Vibe - Website Recommendations

Vibe is a web application that provides contextual website recommendations based on a URL you provide. It uses the Exa AI API to find similar websites, summaries, and highlights.

## Features

- Get website recommendations based on a URL
- Filter by same domain
- Sort by relevance or date
- View content summaries and highlights
- Save your Exa API key in local storage

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- An API key from [Exa AI](https://exa.ai)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd vibe-web-app
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a URL in the input field 
2. (Optional) Enable "Same Domain Only" filter if you want recommendations from the same website
3. Click "Get Recommendations"
4. View the recommendations, summaries, and highlights
5. Sort results by match percentage or date

## API Key

To use this application, you need an API key from [Exa AI](https://exa.ai):

1. Click the Settings button in the header
2. Enter your Exa API key
3. Click "Save API Key"

The API key is stored securely in your browser's local storage.

## Building for Production

To build the app for production:

```
npm run build
```

This will create an optimized production build in the `build` folder.

## Deployment with GitHub Actions

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Steps

1. Push your code to GitHub in a repository
2. Go to your repository on GitHub
3. Go to Settings > Pages
4. Under "Source", select "GitHub Actions"
5. Push a change to the `main` branch or manually trigger the workflow from the "Actions" tab

The GitHub Actions workflow will:
1. Install dependencies
2. Build the application
3. Deploy to GitHub Pages

Your site will be available at `https://<username>.github.io/<repository-name>/`

### Manual Configuration

If you need to customize the deployment, you can edit:
- `.github/workflows/deploy.yml` - The GitHub Actions workflow
- `package.json` - Update the "homepage" field to your specific URL

## License

This project is licensed under the MIT License

## Acknowledgments

- [Exa AI](https://exa.ai) for the recommendation API
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
