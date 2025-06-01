import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

export const metadata: Metadata = {
  title: "Yuma Hearth - Artisan Bread",
  description:
    "Delicious artisan bread, baked fresh in Yuma, Arizona. Order online for local pickup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#F9F4E9" />
        <meta property="og:title" content="Yuma Hearth • Artisan Bread in Yuma, AZ" />
        <meta property="og:description" content="Order scratch-made artisan breads from Yuma Hearth. Local pickup & delivery available in Yuma, AZ." />
        <meta property="og:image" content="https://www.yumahearth.com/images/og-homepage.jpg" />
        <meta property="og:url" content="https://www.yumahearth.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
