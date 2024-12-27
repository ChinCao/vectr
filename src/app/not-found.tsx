"use client";
import Navbar from "@/app/recruit/_components/Navbar";
import RecruitButton from "./recruit/_components/RecruitButton";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "./recruit/_constants/constants";
import {BiSolidError} from "react-icons/bi";
import {PRIMARY_ORANGE_HEX} from "@/constants/constants";

const NotFound = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <>
      <title>Oops</title>
      <Navbar showRecruitBtn={true}>
        <RecruitButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
        />
      </Navbar>
      <div className="min-h-[100vh] flex flex-col gap-5 items-center justify-center px-6">
        <h1 className="text-4xl text-primary uppercase font-bold text-center">Trang này không tồn tại</h1>
        <BiSolidError
          fill={PRIMARY_ORANGE_HEX}
          color={PRIMARY_ORANGE_HEX}
          size={100}
        />

        <Link
          href="/"
          className="mt-4"
        >
          <Button onClick={() => playClick()}>Quay trở lại trang chủ</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
