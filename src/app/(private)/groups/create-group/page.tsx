"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GroupForm from "../_components/GroupForm";

const Page = () => {

  return (
    <>
      <div className="px-2 md:px-32 lg:px-40 xl:px-80 h-full py-3 space-y-4">
        <header className="flex justify-between items-center">
          <h1 className="text-center font-sand font-medium text-lg lg:text-2xl text-purple-300">
            Create a new Group
          </h1>
          <Button variant={"secondary"} asChild>
            <Link href="/chat">Go back to chats</Link>
          </Button>
        </header>
        <main className="flex-1">
          <GroupForm  />
        </main>
      </div>
    </>
  );
};

export default Page;


// const [users, setUsers] = useState<UserType[]>([]);
// useEffect(() => {
//   async function getAllUsers() {
//     const res = await GetAllUsersFromMongo();
//     if (!("error" in res)) setUsers(res);
//   }
//   getAllUsers();
// }, []);