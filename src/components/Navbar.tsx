"use client";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, {ReactNode, useState} from "react";
import {Button} from "./ui/button";
import {FaBars} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "@/app/recruit/_constants/constants";
import RecruitButton from "@/app/recruit/_components/RecruitButton";

const Navbar = ({children, showRecruitBtn}: {children: ReactNode; showRecruitBtn: boolean}) => {
  const [toggle, setToggle] = useState(false);
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <header className="fixed top-0 w-full z-[100] bg-background/95 shadow-lg">
      <nav className="flex flex-row items-center container justify-between py-2 gap-4 relative">
        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Image
              src="/logo.png"
              height={44}
              width={100}
              alt="Logo Vectr"
              className="pb-0 sm:pb-3 mr-3 flex-1"
            />
          </Link>
          <div
            className={`flex flex-col ${
              toggle ? null : "hidden"
            } w-full lg:w-max items-center lg:flex-row absolute lg:flex lg:static left-0 top-[100%] hover:cursor-pointer py-0 lg:py-1`}
          >
            {React.Children.map(children, (child) => (
              <div
                className="hover:text-primary tracking-tight lg:w-max w-full hover:bg-secondary bg-white lg:bg-[transparent] lg:hover:bg-[transparent] border-b-2 lg:border-none"
                onClick={() => setToggle(false)}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {showRecruitBtn ? <RecruitButton className="hidden lg:block text-center mr-3" /> : null}
          <div className="flex flex-row gap-2 sm:gap-4 items-center justify-center font-semibold">
            <SignedIn>
              <div className="flex items-center justify-center">
                <UserButton
                  afterSwitchSessionUrl="https://vectr-vcp.com/"
                  afterSignOutUrl="https://vectr-vcp.com/"
                />
              </div>
              <SignedOut>
                <Button>Signout</Button>
              </SignedOut>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  variant={"secondary"}
                  className="w-[65px] sm:w-[80px] px-2"
                >
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="w-[65px] sm:w-[80px] px-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </div>
          <div
            className="cursor-pointer hover:text-primary block lg:hidden"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <ImCross
                size={12}
                onClick={() => playClick()}
              />
            ) : (
              <FaBars onClick={() => playClick()} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
