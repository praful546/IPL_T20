# 🏏 IPL T20 Live Dashboard

A Next.js 14 app providing live IPL match scores, schedules, and points table with real-time updates and modern UI.

Built with:
- **Next.js 14 App Router**
- **TailwindCSS**
- **TypeScript**
- **Puppeteer (for scraping IPL data)**

---

## 🚀 Features

✅ Live match scores with auto-refresh  
✅ Real-time notifications for match events  
✅ Points table scraped from the official IPL website  
✅ Match schedules with detailed timeline view  
✅ Responsive and modern UI  
✅ Deployable on Vercel or Netlify

---

## 🔧 Getting Started

First, install dependencies:

```bash
npm install
Then run the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 to see the app.

Build the production version:

bash
Copy
Edit
npm run build
Preview your build locally:

bash
Copy
Edit
npm run start
📁 Project Structure
rust
Copy
Edit
/src
  /app
    /live-match        // Live matches page
    /points-table      // Points table page
    /match-details     // Match schedule page
  /components          // Reusable UI components
  /pages/api           // Serverless API routes for scraping IPL data
🗂️ Data Sources
Live scores & points table scraped with Puppeteer from official IPL website endpoints.

API routes:

/api/live-match – Fetches live match updates

/api/points – Fetches points table

/api/scrape – Fetches match schedule results

Note: Scraping is subject to site changes or rate limits by the IPL website.

☁️ Build & Deploy
Deploy easily on Vercel or Netlify by connecting your Git repository.

For Netlify, add this in your netlify.toml:

[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
⚠️ Notes
This app scrapes data using Puppeteer. Always respect the IPL website’s terms of service.

For production scraping, consider using caching or official APIs (if available) to avoid heavy traffic or getting blocked.

📖 Learn More
Next.js Documentation

TailwindCSS Documentation

Puppeteer Docs


