import { type ReactNode } from "react";

const Main = (props: { children: ReactNode }) => {
  return (
    <>
      <main className="h-full w-full">{props.children}</main>
    </>
  );
};

export default Main;
