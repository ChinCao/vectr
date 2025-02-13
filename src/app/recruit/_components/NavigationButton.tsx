"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "@/app/recruit/_constants/constants";
import useSound from "use-sound";
import {memo, useMemo} from "react";

const NavigationButton = ({
  className,
  text,
  direction,
  href,
  button_className,
  noArrow,
}: {
  className?: string;
  text: string;
  direction?: "left" | "right";
  href: string;
  button_className?: string;
  noArrow?: boolean;
}) => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  const memoizedButton = useMemo(
    () => (
      <Button className={`flex flex-row items-center justify-center ${button_className} h-max`}>
        <h3 className={`${direction == "right" ? "order-[0]" : "order-1"} whitespace-pre-wrap text-white`}>{text}</h3>
        {direction == "right" && !noArrow ? (
          <FaLongArrowAltRight
            color="white"
            className="order-1"
          />
        ) : direction == "left" && !noArrow ? (
          <FaLongArrowAltLeft
            color="white"
            className="order-[0]"
          />
        ) : null}
      </Button>
    ),
    [button_className, direction, noArrow, text]
  );

  return (
    <Link
      onClick={() => playClick()}
      href={href}
      className={`w-[max-content] flex items-center justify-center gap-2 active:scale-[0.99] ${className}`}
    >
      {memoizedButton}
    </Link>
  );
};

export default memo(NavigationButton);
