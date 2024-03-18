import type { Metadata } from "next";
import "./globals.scss";
import { Providers } from "@/utils/provider";
import { Toaster } from "react-hot-toast";

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
      <body className="">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              className: "toast",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
