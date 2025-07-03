🏏 IPL T20 Live Dashboard

A Next.js 14 app providing live IPL match scores, schedules, and points table with real-time updates and modern UI.

Built with:

Next.js 14 App Router

TailwindCSS

TypeScript

Puppeteer (for scraping IPL data)

Features:

Live match scores with auto-refresh

Real-time notifications for match events

Points table scraped from the official IPL website

Match schedules with detailed timeline view

Responsive and modern UI

Deployable on Vercel or Netlify

Getting Started:

First, install dependencies:
npm install

Then run the development server:
npm run dev

Open your browser at http://localhost:3000 to see the app.

Build the production version:
npm run build

Preview your production build locally:
npm run start

Project Structure:
/src
/app
/live-match -> Live matches page
/points-table -> Points table page
/match-details -> Match schedule page
/components -> Reusable UI components
/pages/api -> Serverless API routes for scraping IPL data

Data Sources:
Live scores and points table are scraped with Puppeteer from the official IPL website.

API routes:

/api/live-match: Fetches live match updates

/api/points: Fetches points table

/api/scrape: Fetches match schedule results

Note: Scraping depends on the IPL website structure and may break if the site changes or blocks scraping.

Build & Deploy:
You can deploy this app easily on Vercel or Netlify by connecting your Git repository.

For Netlify deployment, add this to your netlify.toml file:
[build]
command = "npm run build"
publish = ".next"

[[plugins]]
package = "@netlify/plugin-nextjs"

Notes:

This app uses Puppeteer for scraping IPL data. Make sure you respect the IPL website’s terms of service.

For production, consider caching scraped data or using official APIs (if available) to avoid sending excessive requests.

Learn More:
Next.js Documentation: https://nextjs.org/docs
TailwindCSS Documentation: https://tailwindcss.com/docs
Puppeteer Docs: https://pptr.dev/
