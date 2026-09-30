import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DEVAMSHI | Premium Beauty & Garments",
  description: "Premium beauty services, garments, rental ornaments, and antique collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <SmoothScrollProvider>
          {children}
          <CartDrawer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
