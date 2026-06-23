import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { AudioProvider } from "./context/AudioContext";
import Player from "@/components/Player/Player";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["300","400", "500", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "SoundWave",
  description: "Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AudioProvider>
            <div className="container">
              <Navbar/>
              {children}
              <Player/>
            </div>
          </AudioProvider>
        </Providers>
      </body>
    </html>
  );
}
