"use client";
import Header from "@/components/common/header";
import Main from "@/components/common/main";
import socket from "@/config/socket-config";
import { checkOrCreateUserInMongo } from "@/server-actions/user";
import { StoreStateType } from "@/store/redux-store";
import { logInfo } from "@/utils/log";
import { SignedIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateLayout({ children }: Props) {
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);

  // check if user data is stored in mongodb (First time user - but check every time) //
  useEffect(() => {
    async function checkUser() {
      await checkOrCreateUserInMongo();
    }

    checkUser();
  }, []);

  // socket connection //
  useEffect(() => {
    if (currentUserId) socket.emit("login", currentUserId);

    socket.on("test", (data) => {logInfo(data)})
  }, [currentUserId]);

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
