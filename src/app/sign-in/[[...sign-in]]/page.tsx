import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section className="bg-background flex justify-center items-center h-dvh w-dvw">
        <SignIn />
      </section>
    </>
  );
}
