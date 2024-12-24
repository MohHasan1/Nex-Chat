/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreStateType } from "@/store/redux-store";
import ChatType from "@/types/chat-type";
import UserType from "@/types/user-type";
import { type FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import GroupUserCard from "./GroupUserCard";
import { logError, logInfo } from "@/utils/log";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateNewChat } from "@/server-actions/chat";
import { useRouter } from "next/navigation";

const GroupForm = () => {
  const { chats } = useSelector((state: StoreStateType) => state.chat);
  const { currentUserId } = useSelector((state: StoreStateType) => state.user);
  const users = extract_chatsUser(chats, currentUserId!);

  const [selectedUsersId, setSelectedUserId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const groupNameRef = useRef<HTMLInputElement>(null);
  const groupDescRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const groupName = groupNameRef.current?.value;
    const groupDesc = groupDescRef.current?.value;

    logInfo(groupName, groupDesc);

    if (selectedUsersId.length == 0) return alert("Please select users");

    if (groupName) {
      setLoading(true);

      try {
        const payload = {
          groupName,
          groupBio: groupDesc,
          isGroupChat: true,
          users: [...selectedUsersId, currentUserId!],
          createdBy: currentUserId!,
          groupAdmins: [currentUserId!],
        };
        const res = await CreateNewChat(payload);
        if (!("error" in res)) {
          if (groupNameRef.current) groupNameRef.current.value = "";
          if (groupDescRef.current) groupDescRef.current.value = "";

          router.refresh();
          router.push("/chat");
        }
      } catch (error: any) {
        logError(error.message)
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center size-full">
      <div className="container w-full h-1/3 border rounded-sm flex flex-col justify-start items-center gap-4">
        <h1 className="border-b border-t rounded-t-sm border-t-purple-500 border-purple-600 w-full px-2 py-1">
          Select users to add to group
        </h1>
        <div className="pb-4 flex justify-center items-center gap-1 flex-wrap overflow-y-auto">
          {users.map((user) => (
            <GroupUserCard
              key={user._id}
              user={user}
              selectedUsersId={selectedUsersId}
              setSelectedUserId={setSelectedUserId}
            />
          ))}
        </div>
      </div>

      <div className="border size-full ">
        <h1 className="border-b border-t rounded-t-sm border-t-purple-500 border-purple-600 w-full px-2 py-1">
          Fill in the group description
        </h1>
        <div className="container mx-auto max-w-xl p-2 md:p-4">
          <form
            onSubmit={handleSubmit}
            className="p-4 space-y-5  overflow-y-auto"
          >
            <div className="grid w-full gap-1.5">
              <Label htmlFor="grp-name">Group Description</Label>
              <Input id="grp-name" type="text" ref={groupNameRef} required />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="grp-desc">Group Description</Label>
              <Textarea
                className="max-h-40 xl:max-h-50"
                id="grp-desc"
                ref={groupDescRef}
              />
            </div>

            <Button variant={"secondary"} type="submit" disabled={loading}>
              Create Group
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

// type Props = {

// };

export default GroupForm;

export function extract_chatsUser(chats: ChatType[], currentUserId: string) {
  if (!chats) return [];

  const chatUsers: UserType[] = [];
  for (const chat of chats) {
    const users = chat.users as UserType[];

    for (const user of users) {
      if (user._id !== currentUserId && !chat.isGroupChat) chatUsers.push(user);
    }
  }

  return chatUsers;
}
