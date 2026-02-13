import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout";
import { TrackingProvider } from "@/components/tracking";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CS205 Data Structures",
  description: "Interactive learning tool for data structures and algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background flex flex-col`}
      >
        <Header />
        <TrackingProvider>
          <main className="flex-1">{children}</main>
        </TrackingProvider>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Designed and implemented by Dr. Weihao Qu and LearnAI team.</p>
        </footer>
      </body>
    </html>
  );
}
