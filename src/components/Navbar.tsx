"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import useSound from "use-sound";
import { CLICK_SOUND_URL, CLICK_SOUND_VOLUME } from "@/constants/constants";

const Navbar = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState(false);
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });

  return (
    <header className="fixed top-0 w-full z-[100] bg-background/95 shadow-lg">
      <nav className="flex flex-row items-center container justify-between py-2 relative gap-3">
        <Link href="/">
          <Image src="/logo.png" height={44} width={111} alt="Logo Vectr" />
        </Link>
        <div className="flex flex-row gap-4 items-center justify-center font-semibold ">
          <div
            className={`flex flex-col ${
              toggle ? null : "hidden"
            } w-full lg:flex-row absolute lg:flex lg:static left-0 top-[100%] hover:cursor-pointer py-0 lg:py-1`}
          >
            {React.Children.map(children, (child) => (
              <div
                className="hover:text-primary tracking-tight hover:bg-secondary bg-white lg:bg-[transparent] lg:hover:bg-[transparent] border-b-2 lg:border-none"
                onClick={() => setToggle(false)}
              >
                {child}
              </div>
            ))}
          </div>
          <SignedIn>
            <UserButton />
            <SignedOut>
              <Button>Signout</Button>
            </SignedOut>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant={"secondary"}>Log In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <div
            className="cursor-pointer hover:text-primary block lg:hidden"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <ImCross size={12} onClick={() => playClick()} />
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
