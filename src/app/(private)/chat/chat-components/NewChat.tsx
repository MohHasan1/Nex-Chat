/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateNewChat, GetUserChatList } from "@/server-actions/chat";
import {
  GetAllUsersFromMongo,
  GetCurrentUserFromMongo,
} from "@/server-actions/user";
// import UserType from "@/types/user-type";
import { useToast } from "@/hooks/use-toast";
import { logError, logInfo } from "@/utils/log";
import { LoaderPinwheel, Search } from "lucide-react";
import { useEffect, useState } from "react";

const NewChat = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">New Chat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Chat</DialogTitle>
          <DialogDescription>
            Please write in their username to add.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="username" className="sr-only">
              UserName
            </Label>
            <Input placeholder="User Name" id="username" readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Search</span>
            <Search />
          </Button>
        </div>
        <DisplayUsers />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            {/* <Button type="button" variant="secondary">
              Close
            </Button> */}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;

const DisplayUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currUser, setCurrUser] = useState<any | null>(null);
  const [chats, setChats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const getAllUsersAndCurrent = async () => {
      try {
        setLoading(true);

        const allUser = await GetAllUsersFromMongo();
        if ("error" in allUser) throw new Error("No users found");

        const currentUser = await GetCurrentUserFromMongo();
        if ("error" in currentUser!) throw new Error("No users found");

        const chatList = await GetUserChatList(currentUser?._id);
        if ("error" in currentUser!) throw new Error("No users found");

        setChats(chatList);
        setUsers(allUser);
        setCurrUser(currentUser);
      } catch (error: any) {
        logError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllUsersAndCurrent();
  }, []);

  const { toast } = useToast();
  
  async function handleNewChat(userId: string) {
    try {
      setLoading(true);
      setSelectedUserId(userId);
      const res = await CreateNewChat({
        users: [userId, currUser?._id],
        createdBy: currUser?._id,
        isGroupChat: false,
      });
      if ("error" in res) throw new Error("Error While adding new user.");
      logInfo(res);
      logInfo("User added successfully");
      toast({
        title: "User added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Could not add user, please try again.",
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto my-4 max-w-[60dvw] max-h-[50dvh] overflow-y-auto">
        <div>
          {!selectedUserId && loading && (
            <LoaderPinwheel className="animate-spin" />
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 ">
          {users.map((user) => {
            if (
              user._id === currUser?._id ||
              chats.find((chat: any) =>
                chat.users.find((u: any) => u._id === user._id)
              )
            )
              return;
            return (
              <>
                <div
                  key={user._id}
                  className="flex justify-center items-center gap-4 border p-3 rounded-2xl"
                >
                  <section className="flex justify-center items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={user.profilePictureUrl}
                        alt="User's profile picture"
                      />
                      <AvatarFallback>UP</AvatarFallback>
                    </Avatar>
                    <div>{user.username}</div>
                  </section>
                  <section>
                    <Button
                      variant={"secondary"}
                      disabled={selectedUserId === user._id}
                      onClick={() => handleNewChat(user._id)}
                    >
                      {selectedUserId === user._id && loading ? (
                        <LoaderPinwheel className="animate-spin" />
                      ) : (
                        <span>Add</span>
                      )}
                    </Button>
                  </section>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
