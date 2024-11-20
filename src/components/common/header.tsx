"use client";

import { useUser, UserButton } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser(); // Clerk hook for client-side user fetching

  return (
    <header className="border border-purple-800 flex justify-between items-center px-4 py-3 mx-2 mt-1 rounded-xl bg-slate-800">
      <h1>Nex-Chat</h1>
      <div className="flex gap-3">
        <h1>{user?.username}</h1>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
