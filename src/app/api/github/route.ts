import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

const cache = new Map<string, { data: GitHubRepo[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const cacheKey = "github-repos-Raphaeljdk";
  const now = Date.now();
  const cached = cache.get(cacheKey);

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const res = await fetch(
      "https://api.github.com/users/Raphaeljdk/repos?sort=updated&per_page=12&type=owner",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Raphaeljdk-Portfolio",
        },
        next: { revalidate: 600 },
      },
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();

    const sanitized: GitHubRepo[] = repos.map((r) => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      stargazers_count: r.stargazers_count,
      language: r.language,
      forks_count: r.forks_count,
      updated_at: r.updated_at,
      topics: r.topics ?? [],
    }));

    cache.set(cacheKey, { data: sanitized, timestamp: now });

    return NextResponse.json(sanitized);
  } catch {
    // Return cached data even if stale, or empty array
    if (cached) {
      return NextResponse.json(cached.data);
    }
    return NextResponse.json([]);
  }
}