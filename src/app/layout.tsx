import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hong Kong Masjid Prayer Times",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-4`}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
