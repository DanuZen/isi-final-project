import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://final-project.mbois.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/super-admin/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
