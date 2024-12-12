"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";
import React, { useEffect } from "react";
import { CLICK_SOUND_URL, CLICK_SOUND_VOLUME } from "@/constants/constants";

export default function Home() {
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });

  useEffect(() => {
    const audio = new Audio(CLICK_SOUND_URL);
    audio.preload = "auto";
    audio.load();
  }, []);

  return (
    <>
      <title>Trang chủ</title>
      <Navbar>
        <Link href="/recruit" className="w-full block py-3 px-3">
          Recruit
        </Link>
      </Navbar>
      <div className="min-h-screen flex flex-col items-center justify-center gap-1">
        <Image
          src="/advanced-science-long-set-tkpOtZ.png"
          height={150}
          width={150}
          alt="VECTR Logo"
        />
        <h1 className="font-semibold text-3xl text-center">Coming soon ...</h1>
        <Link href="/recruit" className="mt-4">
          <Button onClick={() => playClick()}>
            Quay trở lại trang recruit
          </Button>
        </Link>
      </div>
    </>
  );
}
