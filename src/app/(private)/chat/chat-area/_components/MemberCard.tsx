import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserType from "@/types/user-type";
import React, { FC } from "react";

const MemberCard: FC<Props> = ({ member }) => {
  return (
    <li>
      <section className="flex justify-left items-center gap-4 cursor-pointer w-full">
        <Avatar>
          <AvatarImage
            src={member.profilePictureUrl}
            alt="User's profile picture"
          />
          <AvatarFallback>
            <div>UP</div>
          </AvatarFallback>
        </Avatar>

        <div className="flex justify-between items-center w-full">
          <h1 className="font-sand font-medium">{member.username}</h1>
        </div>
      </section>
    </li>
  );
};

export default MemberCard;
type Props = { member: UserType };
