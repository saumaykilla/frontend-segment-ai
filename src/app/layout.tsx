import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";

const inter =
  Inter(
    {
      variable:
        "--font-inter",
      subsets:
        [
          "latin",
        ],
    }
  );

export const metadata: Metadata =
  {
    title:
      "Segment Sight ",
    description:
      "A AI Product Analyzed ",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased`}
      >
        <ToastContainer />
        {
          children
        }
        <Analytics />
      </body>
    </html>
  );
}
