import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.URL || 
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === "production" ? "https://thecreatorconnect.com" : "http://localhost:3000")
  ),
  title: {
    default: "TCC — The Creator Connect | Influencer Marketing Agency",
    template: "%s | TCC — The Creator Connect",
  },
  description:
    "TCC is India's premium influencer marketing agency. We help brands scale through creator-led campaigns, AI-powered analytics, UGC production, and performance-driven social media strategies.",
  keywords: [
    "influencer marketing agency",
    "creator marketing",
    "UGC production",
    "Instagram growth",
    "brand campaigns",
    "creator connect",
    "TCC agency",
    "influencer campaigns India",
    "social media marketing",
    "AI content systems",
  ],
  authors: [{ name: "The Creator Connect" }],
  creator: "TCC — The Creator Connect",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thecreatorconnect.com",
    siteName: "TCC — The Creator Connect",
    title: "TCC — The Creator Connect | Premium Influencer Marketing",
    description:
      "Scale your brand with creator-led marketing. India's most premium influencer marketing agency.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TCC — The Creator Connect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TCC — The Creator Connect",
    description: "India's premium influencer marketing agency.",
    images: ["/og-image.jpg"],
    creator: "@thecreatorconnect",
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
  verification: {
    google: "your-google-verification-code",
  },
};

import SmoothScrolling from "@/components/ui/SmoothScrolling";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
