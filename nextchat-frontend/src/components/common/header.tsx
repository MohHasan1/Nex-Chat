"use client";

import socket from "@/config/socket-config";
import { UpdateCurrentUserInMongo } from "@/server-actions/user";
import { StoreStateType } from "@/store/redux-store";
import { logInfo } from "@/utils/log";
import { useUser, UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);

  useEffect(() => {
    if (!user) return;

    // Sync user data with your database
    async function syncMongo() {
      await UpdateCurrentUserInMongo();
    }
    syncMongo();
    
  }, [user]); 

  async function handleLogout() {
    try {
      // clean up //
      socket.emit("logout", currentUserId);
      // Sign out the user programmatically
      await signOut();
    } catch (error) {
      // TODO: maybe connect socket again ...
      logInfo("Error during logout:", error);
    }
  }

  // Wait until currentUserId is available before rendering the component
  // if (!currentUserId) {
  //   return undefined;
  // }

  return (
    <header className="h-16 border border-purple-800 flex justify-between items-center px-4 py-3 mx-2 mt-1 rounded-xl bg-slate-800">
      <h1 className="font-semibold uppercase">Nex-Chat</h1>
      <div className="flex gap-3">
        <h1 className="text-pretty font-sand font-medium">{user?.username}</h1>
        {/* <UserButton /> */}
        <UserButton>
          <UserButton.MenuItems>
            {/* Custom sign-out action */}
            <UserButton.Action
              label="Sign Out"
              labelIcon={<LogOut size={15} />}
              onClick={handleLogout} // Use custom logout handler
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </header>
  );
};

export default Header;
