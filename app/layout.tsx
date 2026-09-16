import type { Metadata } from "next";
import { Bricolage_Grotesque, Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteNav } from "@/src/components/SiteNav";
import { SITE_URL } from "@/src/lib/site";
import "./globals.css";

const SITE_DESCRIPTION =
  "Product manager for integration platforms and third-party APIs. Decision records from B2B SaaS, hospitality tech and healthtech.";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Andres Barriga",
    default: "Andres Barriga — Product Manager, platform & integrations",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Andres Barriga — Product Manager, platform & integrations",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Andres Barriga",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andres Barriga — Product Manager, platform & integrations",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <SiteNav />
        <main className="flex flex-1 flex-col">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
