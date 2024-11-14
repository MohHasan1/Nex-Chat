import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import MainLayout from "@/components/layout/main-layout";

export const metadata: Metadata = {
  title: "NexChat",
  description: "Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased overscroll-none overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: [dark],
            }}
          >
            <MainLayout>{children}</MainLayout>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
