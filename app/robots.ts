import { MetadataRoute } from"next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ||"https://onevision.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login/"],
        other: {
          "Content-Signal": "search=yes, ai-input=yes, ai-train=yes",
        },
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
