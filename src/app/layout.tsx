import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { UIProvider } from "@/providers/ui-provider";
import { AuthProvider } from "@/providers/auth-context";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SparkBoard - AI Startup Idea Canvas & Validation",
  description: "Save, organize, and improve your startup ideas using Gemini AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-primary">
        <QueryProvider>
          <AuthProvider>
            <UIProvider>
              {children}
            </UIProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
