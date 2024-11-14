import { type FC, type ReactNode } from "react";
import Header from "./header";

type Props = { children: ReactNode };

const MainLayout: FC<Props> = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default MainLayout;
