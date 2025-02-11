import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {FaFacebook} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {NavigationGuardProvider} from "next-navigation-guard";
import NextTopLoader from "nextjs-toploader";
import {DriftWidget} from "./recruit/_components/DriftWidget";
import {PRIMARY_ORANGE_HEX} from "@/constants/constants";
import {ThemeProvider} from "@/components/ThemeProvider";

const CoFoSans = localFont({
  src: "./fonts/CoFoSans.otf",
  variable: "--font-cofo-sans",
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
    <ClerkProvider
      telemetry={false}
      afterSignOutUrl="https://vectr-vcp.com/"
    >
      <html lang="en">
        <body className={`${CoFoSans.variable} antialiased font-cofo selection:bg-[#a8c4ec]`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color={PRIMARY_ORANGE_HEX}
              zIndex={100000}
              showSpinner={false}
            />

            <NavigationGuardProvider>{children}</NavigationGuardProvider>

            <footer className="px-4 pb-5 pt-3 border-t-2 flex items-center justify-evenly flex-wrap gap-10 bg-[#000] text-white">
              VECTR© 2024
              <div className="flex gap-2 items-center justify-center flex-wrap">
                <p>Theo dõi chúng mình trên</p>
                <div className="flex gap-2 items-center">
                  <a
                    href="https://www.facebook.com/vectr.vcp"
                    title="Facebook"
                    target="_blank"
                    rel="noopener"
                  >
                    <FaFacebook className="hover:cursor-pointer hover:text-primary" />
                  </a>
                  <a
                    href="https://www.instagram.com/vectr.vcp/"
                    title="Instagram"
                    target="_blank"
                    rel="noopener"
                  >
                    <FaInstagram className="hover:cursor-pointer hover:text-primary" />
                  </a>
                </div>
              </div>
            </footer>
            <DriftWidget />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
