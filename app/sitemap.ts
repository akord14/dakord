import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://akord.al",
      lastModified: new Date(),
    },
  ];
}
