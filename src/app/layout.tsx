import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavigationGuardProvider } from "next-navigation-guard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VECTR",
  description: "CLB STEM-Robotics Vinschool Central Park",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider telemetry={false}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        >
          <NavigationGuardProvider>{children}</NavigationGuardProvider>

          <footer className="pb-5 pt-3 border-t-2 flex items-center justify-evenly flex-wrap gap-10">
            VECTR© 2024
            <div className="flex gap-2 items-center justify-center flex-wrap">
              <p>Theo dõi chúng mình trên</p>
              <div className="flex gap-2 items-center">
                <a
                  href="https://www.facebook.com/vectr.vcp/"
                  title="Facebook"
                  target="_blank"
                  rel="noopener"
                >
                  <FaFacebook className="hover:cursor-pointer hover:text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/vectr.stem.vcp"
                  title="Instagram"
                  target="_blank"
                  rel="noopener"
                >
                  <FaInstagram className="hover:cursor-pointer hover:text-primary" />
                </a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
