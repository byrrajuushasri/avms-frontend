import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    { path: "/membership", priority: 0.9 },
    { path: "/matrimony", priority: 0.9 },
    { path: "/success-stories", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/temples", priority: 0.6 },
    { path: "/temples/events", priority: 0.5 },
    { path: "/satrams", priority: 0.5 },
    { path: "/media/news", priority: 0.6 },
    { path: "/welfare/education", priority: 0.5 },
    { path: "/welfare/employment", priority: 0.5 },
    { path: "/welfare/health", priority: 0.5 },
    { path: "/election-body/state", priority: 0.4 },
    { path: "/election-body/district", priority: 0.4 },
    { path: "/election-body/mandal", priority: 0.4 },
    { path: "/election-body/sangam", priority: 0.4 },
  ] as const;

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
