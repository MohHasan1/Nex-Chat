import Main from "@/components/common/main";

export default function PublicLayout({ children }: Props) {
  return <Main>{children}</Main>;
}
type Props = {
  children: React.ReactNode;
};
