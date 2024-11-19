import "./globals.css";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/main-layout";
import Clerk_Provider from "@/providers/clerk/clerk-provider";
import checkClerkEnvVar from "@/config/clerk-config";
import { checkMongoDBEnvVar } from "@/config/db-config";
import ThemeProvider from "@/providers/theme/theme-provider";

// env variable check //
checkClerkEnvVar();
checkMongoDBEnvVar();

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
          <Clerk_Provider>
            <MainLayout>{children}</MainLayout>
          </Clerk_Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
