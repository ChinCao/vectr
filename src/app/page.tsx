"use client";
import Navbar from "@/app/recruit/_components/Navbar/Navbar";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";
import React, {useEffect, useMemo} from "react";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "@/app/recruit/_constants/constants";
import RecruitButton from "./recruit/_components/RecruitButton";

export default function Home() {
  useEffect(() => {
    const audio = new Audio(CLICK_SOUND_URL);
    audio.preload = "auto";
    audio.load();
  }, []);

  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  const memoizedRecruitButton = useMemo(
    () => (
      <RecruitButton
        className="block lg:hidden"
        button_className="text-left !rounded-none"
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
      <Navbar showRecruitBtn={true}>{memoizedRecruitButton}</Navbar>
      <div className="min-h-screen flex flex-col items-center justify-center gap-1">
        {memoizedImage}
        <h1 className="font-semibold text-3xl text-center">Coming soon ...</h1>
        <Link
          href="/recruit"
          className="mt-4 "
        >
          <Button
            onClick={() => playClick()}
            className="text-white"
          >
            Quay trở lại trang recruit
          </Button>
        </Link>
      </div>
    </>
  );
}
