import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sipeta.upiyptk.ac.id";
  const currentDate = new Date();

  const routes = [
    "",
    "/mahasiswa/dashboard",
    "/mahasiswa/proposal",
    "/mahasiswa/pembimbing",
    "/mahasiswa/bimbingan",
    "/mahasiswa/kalender",
    "/mahasiswa/seminar",
    "/mahasiswa/sidang",
    "/mahasiswa/list-judul",
    "/login",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
