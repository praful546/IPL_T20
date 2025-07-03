import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import LiveMatchesTicker from "@/components/LiveMatchesHeader";
import SponsorPanel from "@/components/SponsorPanel";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=""
      >
        <LiveMatchesTicker/>
           <Header/>
        
        {children}
        <ToastContainer position="top-right" newestOnTop autoClose={3000} />

        <SponsorPanel/>
      </body>
    </html>
  );
}
