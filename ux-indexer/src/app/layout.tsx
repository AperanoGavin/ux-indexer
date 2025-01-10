"use client";

import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "react-query";  // Importez QueryClient et QueryClientProvider
import wagmiClient from "../lib/wagmiClient";
import Header from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const queryClient = new QueryClient();  // Utilisation correcte de 'new'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={wagmiClient}> {/* Correct usage of WagmiConfig */}
            <Header /> {/* Header should be in client components */}
            {children}
          </WagmiConfig>
        </QueryClientProvider>
      </body>
    </html>
  );
}
