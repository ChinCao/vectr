"use client";
import {useUser, useClerk} from "@clerk/nextjs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {VscSignOut} from "react-icons/vsc";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "../../_constants/constants";
import {memo} from "react";
import {useCallback, useMemo} from "react";

const UserMenu = () => {
  const {user} = useUser();
  const {signOut} = useClerk();
  const {setTheme, resolvedTheme} = useTheme();
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  const signOutUser = useCallback(() => {
    signOut({redirectUrl: "/"});
    if (typeof window !== "undefined") {
      localStorage.removeItem("recruit-cache");
    }
  }, [signOut]);

  return useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar
            className="hover:cursor-pointer user-avatar"
            onClick={() => playClick()}
          >
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[99999999999] min-w-[320px] p-4 mr-4">
          <DropdownMenuItem className="p-2">
            <div className="flex items-center justify-start gap-2">
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
          <DropdownMenuItem
            className="p-4 hover:bg-gray-100 dark:hover:bg-gray-900"
            id="switch-theme"
            onClick={() => {
              setTheme(resolvedTheme === "light" ? "dark" : "light");
            }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <h4>Switch to {resolvedTheme === "light" ? "dark" : "light"} mode</h4>
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
    ),
    [user?.imageUrl, user?.firstName, user?.fullName, signOutUser, resolvedTheme, setTheme, playClick]
  );
};

export default memo(UserMenu);
