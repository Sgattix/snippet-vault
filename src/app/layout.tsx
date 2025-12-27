import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SnippetsProvider } from "@/context/SnippetsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnippetVault - Your Code Snippet Manager",
  description: "Save, organize and retrieve your code snippets with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnippetsProvider>
          <Toaster position="bottom-right" richColors />
          {children}
        </SnippetsProvider>
      </body>
    </html>
  );
}
