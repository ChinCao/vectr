"use client";
import {useUser, useClerk} from "@clerk/nextjs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {VscSignOut} from "react-icons/vsc";
import {Button} from "@/components/ui/button";

const UserMenu = () => {
  const {user} = useUser();
  const {signOut} = useClerk();

  const signOutUser = () => {
    signOut({redirectUrl: "/"});
    if (typeof window !== "undefined") {
      localStorage.removeItem("recruit-cache");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer user-avatar">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999999999] min-w-[320px] p-4 mr-4">
        <DropdownMenuItem className="p-2">
          <div className="flex  items-center justify-start gap-2">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <h4>{user?.fullName}</h4>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={signOutUser}
        >
          <h4>Sign Out</h4>
          <VscSignOut />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
