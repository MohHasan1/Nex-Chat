/* eslint-disable @typescript-eslint/no-explicit-any */
import UserType from "@/types/user-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { logInfo } from "@/utils/log";

const GroupUserCard = ({ user, selectedUsersId, setSelectedUserId }: Props) => {
  logInfo(selectedUsersId)
  function handleOnChange() {
    if (selectedUsersId.includes(user._id)) {
      const ids = selectedUsersId.filter((id) => id !== user._id);
      setSelectedUserId(ids);
    } else {
      setSelectedUserId([...selectedUsersId, user._id]);
    }
  }
  
  return (
    <div className="flex justify-start items-center gap-2 border p-2 w-40 lg:w-48 rounded-xl">
      <Checkbox
        checked={selectedUsersId?.includes(user._id)}
        onCheckedChange={handleOnChange}
      />
      <Avatar>
        <AvatarImage src={user.profilePictureUrl} alt={user.username} />
        <AvatarFallback>UP</AvatarFallback>
      </Avatar>
      <div className="truncate">{user.username}</div>
    </div>
  );
};

type Props = {
  user: UserType;
  selectedUsersId: string[];
  setSelectedUserId: React.Dispatch<React.SetStateAction<string[]>>;
};
export default GroupUserCard;
