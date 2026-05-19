import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";

import "./globals.css";

import { RenderLayout } from "@/components/layout";
import { ApolloWrapper } from "@/lib/apollo/ApolloWrapper";
import { AbilityProvider } from "@/lib/casl/AbilityProvider";
import MuiConfigProvider from "@/lib/materialUI";
import { NextAuthProvider } from "@/lib/next-auth";
// import { QueryProvider } from "@/lib/tanStack/queryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediStock",
  description: "Эмнэлгийн нөөц, тоног төхөөрөмжийн удирдлагын систем",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <NextAuthProvider>
            <AbilityProvider>
              {/* <QueryProvider> */}
              <MuiConfigProvider>
                <RenderLayout>{children}</RenderLayout>
              </MuiConfigProvider>
              {/* </QueryProvider> */}
            </AbilityProvider>
          </NextAuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
