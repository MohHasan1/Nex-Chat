import "./globals.css";
import type { Metadata } from "next";
import Clerk_Provider from "@/providers/clerk/clerk-provider";
import checkClerkEnvVar from "@/config/clerk-config";
import { checkMongoDBEnvVar } from "@/config/db-config";
import ThemeProvider from "@/providers/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/providers/redux/ReduxProvider";
import InitialDataLoader from "@/providers/InitialDataLoader";

// env variable check //
checkClerkEnvVar();
checkMongoDBEnvVar();

export const metadata: Metadata = {
  title: "NexChat",
  description: "Chat Application",
};

export default function RootLayout({ children }: Readonly<Props>) {
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
            <ReduxProvider>
              <InitialDataLoader>
                {children}
                <Toaster />
              </InitialDataLoader>
            </ReduxProvider>
          </Clerk_Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

type Props = {
  children: React.ReactNode;
};
