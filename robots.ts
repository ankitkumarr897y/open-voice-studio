import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export default function robots(): MetadataRoute.Robots {
  const agents = ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"];
  return {
    rules: agents.map((ua) => ({ userAgent: ua, allow: "/" })),
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/index.xml`],
  };
}
