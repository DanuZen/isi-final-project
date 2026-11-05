import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";


export const metadata: Metadata = {
  metadataBase: new URL("https://final-project.mbois.id"),
  title: {
    default: "PT MBOIS - Final Project",
    template: "%s | PT MBOIS - Final Project",
  },
  description: "PT MBOIS - Final Project. Platform Terpadu Manajemen Pembelajaran, Bimbingan, dan Evaluasi Tugas Akhir & Proyek.",
  applicationName: "PT MBOIS - Final Project",
  authors: [{ name: "PT MBOIS", url: "https://mbois.id" }],
  generator: "Next.js",
  keywords: [
    "PT MBOIS",
    "Final Project",
    "PT MBOIS - Final Project",
    "Tugas Akhir",
    "Bimbingan Proyek",
    "Evaluasi",
    "Learning Management",
  ],
  creator: "PT MBOIS",
  publisher: "PT MBOIS",
  category: "Education",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/mbois_white.png", type: "image/png" },
    ],
    shortcut: "/mbois_white.png",
    apple: "/mbois_white.png",
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "PT MBOIS - Final Project",
    description: "Platform Terpadu Manajemen Pembelajaran, Bimbingan, dan Evaluasi Proyek",
    url: "https://final-project.mbois.id",
    siteName: "PT MBOIS - Final Project",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "PT MBOIS - Final Project",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT MBOIS - Final Project",
    description: "Platform Terpadu Manajemen Pembelajaran, Bimbingan, dan Evaluasi Proyek",
    images: [
      "/og_image.png",
    ],
  },
  other: {
    "image": "/og_image.png",
    "og:image:secure_url": "/og_image.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-slate-900" suppressHydrationWarning>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
