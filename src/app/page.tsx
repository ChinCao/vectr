"use client";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";
import React, {useEffect, useMemo} from "react";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "@/app/recruit/_constants/constants";
import NavSpotlighButton from "../components/NavSpotlighButton";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  useEffect(() => {
    const audio = new Audio(CLICK_SOUND_URL);
    audio.preload = "auto";
    audio.load();
  }, []);

  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  const memoizedRecruitButton = useMemo(
    () => (
      <NavSpotlighButton
        className="block lg:hidden"
        button_className="text-left !rounded-none"
        text="Wirebuzz"
        href="/workshop/wirebuzz/signup"
      />
    ),
    []
  );

  const memoizedImage = useMemo(
    () => (
      <Image
        src="/advanced-science-long-set-tkpOtZ.png"
        height={150}
        width={150}
        alt="VECTR Logo"
      />
    ),
    []
  );

  return (
    <>
      <title>Trang chủ</title>
      <Navbar
        showSpotlightButton={true}
        spotLightButtonHref="/workshop/wirebuzz/signup"
        spotlightButtonButtonText="Wirebuzz"
      >
        <Link
          onClick={() => playClick()}
          href="/recruit"
          className="w-full block py-3 px-3 font-normal hover:text-primary"
        >
          <h1>Recruit</h1>
        </Link>
        {memoizedRecruitButton}
      </Navbar>
      <div className="min-h-screen flex flex-col items-center justify-center gap-1">
        {memoizedImage}
        <h1 className="font-semibold text-3xl text-center">Coming soon ...</h1>
        <Link
          href="/workshop/wirebuzz/signup"
          className="mt-4 "
        >
          <Button
            onClick={() => playClick()}
            className="text-white"
          >
            Đăng ký workshop wirebuzz
          </Button>
        </Link>
      </div>
    </>
  );
}
