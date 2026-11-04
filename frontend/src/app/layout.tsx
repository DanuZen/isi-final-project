import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: false,
});

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
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-slate-900" suppressHydrationWarning>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
