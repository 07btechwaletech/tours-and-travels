import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Add the /destinations/[slug] SEO pages here as they go live.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "weekly", priority: 1 }];
}
