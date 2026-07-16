import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface NewsItem {
  title: string;
  url: string;
  snippet: string;
  source: string;
  date: string;
}

let cachedNews: NewsItem[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const QUERIES = [
  "tech news javascript react 2025",
  "novidades tecnologia programação 2025",
];

export async function GET() {
  const now = Date.now();

  // Return cached results if still valid
  if (cachedNews && now - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json(cachedNews);
  }

  try {
    const zai = await ZAI.create();

    const allResults: NewsItem[] = [];

    for (const query of QUERIES) {
      const response = await zai.functions.invoke("web_search", {
        query,
        count: 8,
      });

      const results = response?.results ?? response?.data ?? response;

      if (Array.isArray(results)) {
        for (const item of results) {
          allResults.push({
            title: item.title ?? item.name ?? "",
            url: item.url ?? item.link ?? "",
            snippet: item.snippet ?? item.description ?? item.content ?? "",
            source:
              item.source ??
              item.host_name ??
              item.domain ??
              new URL(item.url ?? item.link ?? "https://example.com").hostname,
            date: item.date ?? item.publishedDate ?? "",
          });
        }
      }
    }

    // Deduplicate by URL
    const seen = new Set<string>();
    const unique = allResults.filter((item) => {
      const key = item.url.replace(/\/$/, "");
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    cachedNews = unique;
    cacheTimestamp = now;

    return NextResponse.json(unique);
  } catch {
    // Return stale cache if available
    if (cachedNews) {
      return NextResponse.json(cachedNews);
    }
    return NextResponse.json([]);
  }
}