import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

interface MatchTeam {
  name: string;
  score: string;
  overs: string;
  flag: string;
}

interface MatchData {
  stage: string;
  venue: string;
  date: string;
  summary: string;
  matchLink: string;
  team1: MatchTeam;
  team2: MatchTeam;
}

let cachedData: MatchData[] | null = null;
let lastFetchedTime = 0;
const CACHE_DURATION = 10 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ matches: MatchData[] } | { error: string }>
) {
  try {
    const now = Date.now();

    if (cachedData && now - lastFetchedTime < CACHE_DURATION) {
      console.log("Returning data from cache...");
      return res.status(200).json({ matches: cachedData });
    }

    console.log("Starting puppeteer scrape...");

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1200, height: 800 });

    console.log("Navigating to IPL results page...");
    await page.goto('https://www.iplt20.com/matches/results', {
      waitUntil: 'networkidle0',
    });

    await page.waitForSelector("li.ng-scope", { timeout: 15000 });

    const content = await page.content();
    const $ = cheerio.load(content);

    const matches: MatchData[] = [];

    $("li.ng-scope").each((i, el) => {
      const stage = $(el).find(".vn-matchOrder").text().trim();
      const venueEl = $(el).find(".vn-venueDet p").text().trim();
      const date = $(el).find(".vn-matchDateTime").text().trim();
      const summary = $(el).find(".vn-ticketTitle").text().trim();

      const team1El = $(el).find(".vn-shedTeam").first();
      const team1Name = team1El.find("h3").text().trim();
      const team1Score = team1El.find("p").text().trim();
      const team1Overs = team1El.find(".ov-display").text().trim();
      const team1Flag = team1El.find("img").attr("src") || "";

      const team2El = $(el).find(".vn-shedTeam.vn-team-2").first();
      const team2Name = team2El.find("h3").text().trim();
      const team2Score = team2El.find("p").text().trim();
      const team2Overs = team2El.find(".ov-display").text().trim();
      const team2Flag = team2El.find("img").attr("src") || "";

      const matchLink = $(el).find("a.vn-matchBtn").attr("href") || "";

      if (!team1Name || !team2Name) return;

      matches.push({
        stage,
        venue: venueEl,
        date,
        summary,
        matchLink,
        team1: { name: team1Name, score: team1Score, overs: team1Overs, flag: team1Flag },
        team2: { name: team2Name, score: team2Score, overs: team2Overs, flag: team2Flag },
      });
    });

    console.log(`Found ${matches.length} matches.`);

    await browser.close();

    cachedData = matches;
    lastFetchedTime = now;

    return res.status(200).json({ matches });
  } catch (err) {
    console.error("Scraping error:", err);
    res.status(500).json({ error: 'Scraping failed' });
  }
}
