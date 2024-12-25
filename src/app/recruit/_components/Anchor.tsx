"use client";

import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "../_constants/constants";

const Anchor = ({href, text}: {href: string; text: string}) => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <a
      onClick={() => playClick()}
      href={href}
      className="w-full block py-3 px-3 font-light"
    >
      {text}
    </a>
  );
};

export default Anchor;
