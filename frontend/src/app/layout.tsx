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
  title: "SIPETA UPI YPTK — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir",
  description: "Sistem Informasi Perjalanan & Evaluasi Tugas Akhir UPI YPTK Padang",
  icons: {
    icon: "/upiyptk_emblem.webp",
    shortcut: "/upiyptk_emblem.webp",
    apple: "/upiyptk_emblem.webp",
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
