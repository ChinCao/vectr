"use client";
import {SignedIn, SignedOut, SignInButton, SignUpButton} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, {ReactNode, useState, useMemo, useCallback, memo} from "react";
import {FaBars} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "@/app/recruit/_constants/constants";
import RecruitButton from "@/app/recruit/_components/RecruitButton";
import {Button} from "@/components/ui/button";
import UserMenu from "./UserMenu";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const Navbar = ({children, showRecruitBtn}: {children: ReactNode; showRecruitBtn: boolean}) => {
  const [toggle, setToggle] = useState(false);
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});
  const {setTheme, resolvedTheme} = useTheme();

  const handlePlayClick = useCallback(() => {
    playClick();
  }, [playClick]);

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev);
    playClick();
  }, [setToggle, playClick]);

  const handleThemeToggle = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
    playClick();
  }, [setTheme, resolvedTheme, playClick]);

  const handleAuthClick = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("recruit-cache");
    }
    playClick();
  }, [playClick]);

  const handleChildClick = useCallback(() => {
    setToggle(false);
  }, [setToggle]);

  const memoizedImage = useMemo(
    () => (
      <Link href="/">
        <Image
          src="/logo-light.png"
          height={44}
          width={100}
          alt="Logo Vectr"
          className="pb-0 sm:pb-3 mr-3 flex-1 dark:hidden"
        />
        <Image
          src="/logo-dark.png"
          height={44}
          width={100}
          alt="Logo Vectr"
          className="pb-0 sm:pb-3 mr-3 flex-1 dark:block hidden"
        />
      </Link>
    ),
    []
  );

  const memoizedSignedIn = useMemo(
    () => (
      <SignedIn>
        <div
          className="flex items-center justify-center"
          onClick={handlePlayClick}
        >
          <UserMenu />
        </div>
      </SignedIn>
    ),
    [handlePlayClick]
  );

  const memoizedSignedOut = useMemo(
    () => (
      <SignedOut>
        <SignInButton>
          <Button
            onClick={handleAuthClick}
            variant={"secondary"}
            className="w-[65px] sm:w-[80px] px-2"
          >
            Log In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button
            onClick={handleAuthClick}
            className="w-[65px] sm:w-[80px] px-2 text-white"
          >
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
    ),
    [handleAuthClick]
  );

  const memoizedTooltipProvider = useMemo(
    () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="hover:cursor-pointer ml-2"
              id="change-theme-btn"
              onClick={handleThemeToggle}
            >
              {resolvedTheme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="z-[9999999999] relative bg-foreground text-background">
            <p>Change to {resolvedTheme === "dark" ? "light" : "dark"} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    [handleThemeToggle, resolvedTheme]
  );

  const memoizedRecruitButton = useMemo(
    () => (showRecruitBtn ? <RecruitButton className="hidden lg:block text-center mr-3" /> : null),
    [showRecruitBtn]
  );

  const memoizedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => (
        <div
          className="hover:text-primary tracking-tight lg:w-max w-full hover:bg-secondary bg-background lg:bg-[transparent] lg:hover:bg-[transparent] border-b-2 lg:border-none"
          onClick={handleChildClick}
        >
          {child}
        </div>
      )),
    [children, handleChildClick]
  );

  const memoizedFaBars = useMemo(() => <FaBars onClick={handlePlayClick} />, [handlePlayClick]);

  return (
    <header className="fixed top-0 w-full z-[100] bg-background opacity-[98%] lg:opacity-95 border-b-[1px] border-slate-200 dark:border-slate-700">
      <nav className="flex flex-row items-center container justify-between py-2 gap-4 relative">
        <div className="flex items-center justify-center gap-3">
          {memoizedImage}
          <div
            className={`flex flex-col ${
              toggle ? null : "hidden"
            } w-full lg:w-max items-center lg:flex-row absolute lg:flex lg:static left-0 top-[100%] hover:cursor-pointer py-0`}
          >
            {memoizedChildren}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {memoizedRecruitButton}
          <div className="flex flex-row gap-2 sm:gap-4 items-center justify-center font-semibold">
            {memoizedSignedIn}
            {memoizedSignedOut}

            {memoizedTooltipProvider}
          </div>
          <div
            className="cursor-pointer hover:text-primary block lg:hidden"
            onClick={handleToggle}
          >
            {toggle ? (
              <ImCross
                size={12}
                onClick={handlePlayClick}
              />
            ) : (
              memoizedFaBars
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default memo(Navbar);
