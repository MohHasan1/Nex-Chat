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
import { Search } from "lucide-react";

const NewGroup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">New Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Group Chat</DialogTitle>
          <DialogDescription>
            Please write in the group name and add users.
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

export default NewGroup;
