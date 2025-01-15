"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "../app/recruit/_constants/constants";
import useSound from "use-sound";
import clsx from "clsx";
import {useCallback, useMemo, memo} from "react";

const NavSpotlighButton = memo(
  ({className, button_className, text, href}: {href: string; text: string; className?: string; button_className?: string}) => {
    const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

    const handleClick = useCallback(() => {
      playClick();
    }, [playClick]);

    const memoizedButton = useMemo(
      () => (
        <Button
          onClick={handleClick}
          className={clsx(
            button_className,
            "w-full py-1 bg-primary text-white hover:bg-transparent border border-primary hover:text-primary lg:rounded pl-2 lg:pl-0 mx-0 lg:ml-3 !px-2 block"
          )}
        >
          {text}
        </Button>
      ),
      [handleClick, button_className, text]
    );

    return (
      <Link
        href={href}
        className={clsx(className)}
      >
        {memoizedButton}
      </Link>
    );
  }
);

NavSpotlighButton.displayName = "NavSpotlighButton";

export default NavSpotlighButton;
