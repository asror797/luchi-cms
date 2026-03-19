import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Diary of a Breastie",
    template: "%s — Diary of a Breastie",
  },
  description:
    "A faith-integrated media and wellness platform amplifying the voices of breast cancer survivors through honest conversations, gut health coaching, and community.",
  keywords: [
    "breast cancer survivor",
    "podcast",
    "gut health coaching",
    "wellness",
    "faith",
    "survivorship",
    "breastie community",
  ],
  authors: [{ name: "Diary of a Breastie" }],
  openGraph: {
    siteName: "Diary of a Breastie",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <div style={{ margin: "0 auto", background: "#fff", paddingTop: 52, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
