"use client"
import Header from "@/components/common/header";
import Main from "@/components/common/main";
import { checkOrCreateUserInMongo } from "@/server-actions/user";
import { SignedIn } from "@clerk/nextjs";
import { useEffect } from "react";

export default function PrivateLayout({ children }: Props) {
  useEffect(() => {
    async function checkUser() {
      await checkOrCreateUserInMongo();
    }

    checkUser();
  }, []);

  return (
    <>
      <SignedIn>
        <section className="flex flex-col h-dvh w-dvw">
          <Header />
          <Main>{children}</Main>
        </section>
      </SignedIn>
    </>
  );
}
type Props = {
  children: React.ReactNode;
};
