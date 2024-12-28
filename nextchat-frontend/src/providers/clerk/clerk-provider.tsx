import { dark } from "@clerk/themes";
import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Clerk_Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: [dark],
        }}
      >
        {children}
      </ClerkProvider>
    </>
  );
};

export default Clerk_Provider;
