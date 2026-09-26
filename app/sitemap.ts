import { MetadataRoute } from "next";
import { programmes } from "@/lib/data/programmes";
import { campaigns } from "@/lib/data/campaigns";
import { stories } from "@/lib/data/stories";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://onevision.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about/team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about/governance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programmes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/campaigns`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/stories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/get-help`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/volunteer`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/donate`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/reports`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/open-ledger`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/search`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/accessibility`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const programmeRoutes: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${BASE_URL}/programmes/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const campaignRoutes: MetadataRoute.Sitemap = campaigns.map((c) => ({
    url: `${BASE_URL}/campaigns/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const storyRoutes: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${BASE_URL}/stories/${s.slug}`,
    lastModified: new Date(s.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...programmeRoutes, ...campaignRoutes, ...storyRoutes];
}
