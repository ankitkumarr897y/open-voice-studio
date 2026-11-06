import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/studio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/voice-clone", priority: 0.9, changeFrequency: "weekly" },
  { path: "/dialogue", priority: 0.8, changeFrequency: "monthly" },
  { path: "/voices", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
