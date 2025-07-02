# Automated Deployment to Netlify with GitHub Actions

This repository demonstrates a CI/CD pipeline for automatically building and deploying a web application to Netlify whenever changes are pushed to the `main` branch. [current deployment](https://charming-gumdrop-499706.netlify.app)

![Screenshot](https://raw.githubusercontent.com/mjavason/netlify-auto-deploy-demo/main/public/screenshot.png)

## How It Works

The core of the automation is the GitHub Actions workflow defined in `.github/workflows/deploy.yaml`. This workflow is triggered on every push to the `main` branch and performs the following steps:

1.  **Checkout Code**: The repository code is checked out.
2.  **Setup Node.js**: A specific version of Node.js is installed for the build environment.
3.  **Install Dependencies**: `npm install` is run to fetch all project dependencies.
4.  **Create `.env` File**: It securely creates a `.env` file for the build process by sourcing secrets from the GitHub repository's settings. This allows you to pass sensitive keys to your build without committing them to the repository.
5.  **Build Project**: The command `npm run build` is executed to compile the application for production.
6.  **Install Netlify CLI**: The Netlify command-line interface is installed globally in the runner.
7.  **Deploy to Netlify**: The `netlify deploy` command is used to push the contents of the `dist` directory to your Netlify site. It authenticates using a `NETLIFY_AUTH_TOKEN` and targets a specific site with `NETLIFY_SITE_ID`.

## Setup Instructions

To replicate this setup in your own project, follow these steps:

### 1. Create the Workflow File

Create the file `.github/workflows/deploy.yaml` and add the following content. This defines the deployment job.

```yaml
name: Deploy to Netlify

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 22.16 # Or your desired version

      - name: Install dependencies
        run: npm install

      - name: Create .env file from GitHub Secrets
        run: |
          # Add all your build-time environment variables here
          echo "VITE_REACT_APP_API_URL=${{ secrets.VITE_REACT_APP_API_URL }}" >> .env

      - name: Build project
        run: npm run build # Or your project's build command

      - name: Install Netlify CLI
        run: npm install -g netlify-cli

      - name: Deploy to Netlify
        run: netlify deploy --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 2. Configure Netlify

You need two key pieces of information from your Netlify account.

#### `NETLIFY_AUTH_TOKEN` (Personal Access Token)

1.  Log in to your Netlify account.
2.  Go to **User settings** > **Applications** or [personal-access-tokens](https://app.netlify.com/user/applications#personal-access-tokens)
3.  Under the **Personal access tokens** section, click **New personal access token**.
4.  Give your token a descriptive name (e.g., "GitHub Actions Deploy") and click **Generate token**.
5.  **Important:** Copy the token immediately. You will not be able to see it again.

#### `NETLIFY_SITE_ID` (Site's API ID)

1.  From the Netlify dashboard, select the site you want to deploy to. If you haven't created one, do so first.
2.  Go to **Site settings** > **General** > **Site details**.
3.  Under the **Site information** section, copy the **API ID**.

### 3. Add Secrets to GitHub

Next, you must securely store the credentials from Netlify in your GitHub repository's secrets.

1.  In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret** for each of the following secrets:
    *   `NETLIFY_AUTH_TOKEN`: Paste the personal access token you generated from Netlify.
    *   `NETLIFY_SITE_ID`: Paste the API ID of your Netlify site.
    *   (Optional) `VITE_REACT_APP_API_URL`: Add any other secrets your application needs during the build process. The workflow is configured to read this and create a `.env` file from it.

Once these steps are completed, any push to your `main` branch will automatically trigger the GitHub Action and deploy your site to Netlify.
