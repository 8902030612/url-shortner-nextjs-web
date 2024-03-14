import type { Metadata } from "next";
import "./globals.scss";
import { Providers } from "@/utils/provider";

export const metadata: Metadata = {
  title: {
    template: "%s | VeriDoc URL Shortner",
    default: "VeriDoc URL Shortner",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
