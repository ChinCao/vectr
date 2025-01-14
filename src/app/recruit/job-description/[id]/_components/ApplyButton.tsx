"use client";
import Link from "next/link";
import {ReactNode} from "react";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "@/app/recruit/_constants/constants";
import useSound from "use-sound";

const ApplyButton = ({children, id}: {children: ReactNode; id: string}) => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <Link
      href={`/recruit/job-description/${id}/apply`}
      className="flex items-center justify-center w-full md:w-[max-content]"
      onClick={() => playClick()}
      prefetch
    >
      {children}
    </Link>
  );
};

export default ApplyButton;
