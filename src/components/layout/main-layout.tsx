import { type FC, type ReactNode } from "react";
import Header from "../common/header";
import { SignedIn } from "@clerk/nextjs";
import Main from "../common/main";

type Props = { children: ReactNode };

const MainLayout: FC<Props> = (props) => {
  return (
    <>
      <SignedIn>
        <section className="flex flex-col h-dvh w-dvw">
          <Header />
          <Main>{props.children}</Main>
        </section>
      </SignedIn>
    </>
  );
};

export default MainLayout;
