import Header from "@/components/common/header";
import Main from "@/components/common/main";
import { SignedIn } from "@clerk/nextjs";

export default function PrivateLayout({ children }: Props) {
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
