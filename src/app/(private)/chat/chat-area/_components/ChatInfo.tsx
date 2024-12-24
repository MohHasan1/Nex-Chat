import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatType from "@/types/chat-type";
import UserType from "@/types/user-type";
import { Info } from "lucide-react";
import { FC } from "react";
import MemberCard from "./MemberCard";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";

const ChatInfo: FC<Props> = ({ chat, chatUser }) => {
  const isGroup = chat.isGroupChat;
  const groupMembers = chat.users as UserType[];
  const groupCreatedBy = chat.createdBy as UserType;
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant="ghost">
            <Info />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>
              {isGroup ? chat.groupName : chatUser.username}
            </SheetTitle>
            <SheetDescription>
              {isGroup ? chat.groupBio : chatUser.bio}
            </SheetDescription>
          </SheetHeader>

          <Separator />
          <section className="flex flex-col justify-center items-start gap-1 my-3">
            <div className="font-sand flex justify-center items-center gap-1 pointer-events-none">
              <h1>Created On :</h1>
              <span className="text-slate-400">
                {dayjs(chat.createdAt).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="font-sand flex justify-center items-center gap-1 pointer-events-none">
              <h1>Created By :</h1>
              <span className="text-slate-400">{groupCreatedBy.username}</span>
            </div>
            <Separator className="my-4"/>
            {isGroup && (
              <div className="font-sand flex flex-col justify-center items-start gap-4 pointer-events-none">
                <h1>Group members:</h1>
                <ul className="list-none flex flex-col gap-3">
                  {groupMembers.map((user) => (
                    <MemberCard key={user._id} member={user} />
                  ))}
                </ul>
              </div>
            )}
          </section>

          <Separator />

          <SheetFooter>
            <SheetClose asChild className="mx-auto mt-4">
              <Button size={"sm"} type="button" variant={"secondary"}>
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatInfo;

type Props = {
  chat: ChatType;
  chatUser: UserType;
};
