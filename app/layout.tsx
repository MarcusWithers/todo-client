import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nooro To-do List",
  description: "nooro To-do List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#1a1a1a]' style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
