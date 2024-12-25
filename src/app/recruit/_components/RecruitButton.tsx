"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "../_constants/constants";
import useSound from "use-sound";

const RecruitButton = ({className, button_className}: {className?: string; button_className?: string}) => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <Link
      href="/recruit"
      className={`${className}`}
    >
      <Button
        onClick={() => playClick()}
        className={`${button_className} w-full  py-1 bg-primary text-white hover:bg-transparent border border-primary hover:text-primary lg:rounded rounded pl-2 lg:pl-0 mx-0 lg:ml-3 !px-2 block`}
      >
        Recruit
      </Button>
    </Link>
  );
};

export default RecruitButton;
