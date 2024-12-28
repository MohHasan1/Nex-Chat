"use client";
import { Button } from "@/components/ui/button";
import GroupForm from "../../_components/GroupForm";
import { FC, use, useEffect, useState } from "react";
import { GetChatById } from "@/server-actions/chat";
import ChatType from "@/types/chat-type";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditGroupInfo: FC<Props> = ({ params }) => {
  const { groupId } = use(params);

  const [chat, setChat] = useState<ChatType>();
  const router = useRouter();

  useEffect(() => {
    async function getChat() {
      const res = await GetChatById(groupId);
      if (res && !("error" in res)) {
        setChat(res);
      } else {
        alert("Error getting group information");
        router.back();
      }
    }
    getChat();
  }, [groupId, router]);


  return (
    <div className="px-2 md:px-32 lg:px-40 xl:px-80 h-full py-3 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-center font-sand font-medium text-lg lg:text-2xl text-purple-300">
          Edit Group Info. -{" "}
          <span className="text-violet-500">{chat?.groupName}</span>
        </h1>
        <Button variant={"secondary"} asChild>
          <Link href="/chat">Go back to chats</Link>
        </Button>
      </header>
      <main className="flex-1">
        <GroupForm oldChat={chat!} />
      </main>
    </div>
  );
};

export default EditGroupInfo;

type Props = {
  params: Promise<{ groupId: string }>;
};
