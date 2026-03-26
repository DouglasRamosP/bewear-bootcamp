import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bewear | Curadoria urbana premium",
    template: "%s | Bewear",
  },
  description:
    "E-commerce de moda urbana com curadoria premium, checkout seguro e experiência moderna para portfólio profissional.",
  metadataBase: new URL("https://bewear.vercel.app"),
  openGraph: {
    title: "Bewear | Curadoria urbana premium",
    description:
      "Moda urbana com visual editorial, experiência fluida e checkout seguro.",
    siteName: "Bewear",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ReactQueryProvider>
          <div className="relative isolate min-h-screen overflow-x-hidden">
            {children}
          </div>
        </ReactQueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
