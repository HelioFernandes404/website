import type { APIRoute } from "astro";

const fallbackSite = new URL("https://hub.heliosuns404.com");

export const GET: APIRoute = ({ site }) => {
  const base = site ?? fallbackSite;
  const host = base.host;
  const sitemapUrl = new URL("/sitemap.xml", base).toString();

  const body = [`User-agent: *`, `Allow: /`, ``, `Host: ${host}`, `Sitemap: ${sitemapUrl}`].join(
    "\n"
  );

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
