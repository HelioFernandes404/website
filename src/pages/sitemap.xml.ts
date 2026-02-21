import type { APIRoute } from "astro";
import { posts } from "../data/posts";

const fallbackSite = new URL("https://hub.heliosuns404.com");

interface UrlEntry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = ({ site }) => {
  const base = site ?? fallbackSite;
  const latestPostDate = posts.reduce((latest, post) => (post.date > latest ? post.date : latest), "");

  const staticEntries: UrlEntry[] = [
    {
      loc: new URL("/", base).toString(),
      changefreq: "weekly",
      priority: "1.0",
      ...(latestPostDate ? { lastmod: latestPostDate } : {}),
    },
    {
      loc: new URL("/craft", base).toString(),
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      loc: new URL("/blog", base).toString(),
      changefreq: "daily",
      priority: "0.9",
      ...(latestPostDate ? { lastmod: latestPostDate } : {}),
    },
  ];

  const postEntries: UrlEntry[] = posts.map((post) => ({
    loc: new URL(`/blog/${post.slug}`, base).toString(),
    changefreq: "monthly",
    priority: "0.7",
    lastmod: post.date,
  }));

  const urls = [...staticEntries, ...postEntries];
  const urlNodes = urls
    .map((entry) =>
      [
        "  <url>",
        `    <loc>${xmlEscape(entry.loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : "",
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
