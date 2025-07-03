import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

let cachedPoints: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const now = Date.now();
    if (cachedPoints && now - lastFetchTime < CACHE_DURATION) {
      console.log("Serving points table from cache");
      return res.status(200).json({ points: cachedPoints });
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );

    console.log("Fetching fresh points table from IPL website...");
    await page.goto("https://www.iplt20.com/points-table/men", { waitUntil: "networkidle0" });

    const content = await page.content();
    const $ = cheerio.load(content);

    const points: any[] = [];
    $("tbody#pointsdata > tr").each((i, el) => {
      const teamLogo = $(el).find(".ih-pt-img img").attr("src") || "";
      const teamName = $(el).find("h2.ih-pt-cont").text().trim();
      const played = $(el).find("td").eq(2).text().trim();
      const wins = $(el).find("td").eq(3).text().trim();
      const losses = $(el).find("td").eq(4).text().trim();
      const nr = $(el).find("td").eq(5).text().trim();
      const nrr = $(el).find("td").eq(6).text().trim();
      const forRuns = $(el).find("td").eq(7).text().trim();
      const againstRuns = $(el).find("td").eq(8).text().trim();
      const pointsValue = $(el).find("td").eq(9).text().trim();

      points.push({
        teamLogo,
        teamName,
        played,
        wins,
        losses,
        nr,
        nrr,
        forRuns,
        againstRuns,
        points: pointsValue,
      });
    });

    await browser.close();

    cachedPoints = points;
    lastFetchTime = now;

    res.status(200).json({ points });
  } catch (err) {
    console.error("Scraping error:", err);
    res.status(500).json({ error: "Scraping failed" });
  }
}
