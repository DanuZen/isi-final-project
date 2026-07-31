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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sipeta-upiyptk.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SIPETA UPI YPTK — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir",
    template: "%s | SIPETA UPI YPTK",
  },
  description: "Sistem Informasi Perjalanan & Evaluasi Tugas Akhir Universitas Putra Indonesia YPTK Padang. Memantau bimbingan, usulan judul, similarity check, seminar proposal, dan sidang skripsi.",
  applicationName: "SIPETA UPI YPTK",
  authors: [{ name: "Universitas Putra Indonesia YPTK Padang", url: "https://upiyptk.ac.id" }],
  generator: "Next.js",
  keywords: [
    "SIPETA",
    "SIPETA UPI YPTK",
    "UPI YPTK Padang",
    "Tugas Akhir",
    "Skripsi",
    "Fakultas Ilmu Komputer",
    "FIK UPI YPTK",
    "Bimbingan Skripsi",
    "Usulan Judul",
    "Similarity Check",
    "Seminar Proposal",
    "Ujian Sidang Skripsi",
    "Sistem Informasi Tugas Akhir",
  ],
  creator: "Universitas Putra Indonesia YPTK Padang",
  publisher: "Universitas Putra Indonesia YPTK Padang",
  category: "Education",
  icons: {
    icon: "/upiyptk_emblem.webp",
    shortcut: "/upiyptk_emblem.webp",
    apple: "/upiyptk_emblem.webp",
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "SIPETA UPI YPTK — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir",
    description: "Sistem Informasi Perjalanan & Evaluasi Tugas Akhir Universitas Putra Indonesia YPTK Padang",
    url: siteUrl,
    siteName: "SIPETA UPI YPTK",
    images: [
      {
        url: `${siteUrl}/og_image.png`,
        width: 1200,
        height: 630,
        alt: "SIPETA UPI YPTK Padang — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIPETA UPI YPTK — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir",
    description: "Sistem Informasi Perjalanan & Evaluasi Tugas Akhir Universitas Putra Indonesia YPTK Padang",
    images: [`${siteUrl}/og_image.png`],
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
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFAFA] text-[#212121]">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
