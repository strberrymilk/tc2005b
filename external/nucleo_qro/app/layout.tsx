import type { Metadata } from "next";
import { Fredoka, Space_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Fredoka({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Núcleo - Proyecto Educativo",
  description: "Educación y comunidad para transformar El Chamizal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
