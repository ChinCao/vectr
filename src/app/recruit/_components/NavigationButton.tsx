import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const NavigationButton = ({
  className,
  text,
  direction,
  href,
  button_className,
}: {
  className?: string;
  text: string;
  direction: "left" | "right";
  href: string;
  button_className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`w-[max-content] flex items-center justify-center gap-2 ${className}`}
    >
      <Button
        className={`flex flex-row items-center justify-center ${button_className}`}
      >
        <h3 className={`${direction == "right" ? "order-[0]" : "order-1"}`}>
          {text}
        </h3>
        {direction == "right" ? (
          <FaLongArrowAltRight color="white" className="order-1" />
        ) : (
          <FaLongArrowAltLeft color="white" className="order-[0]" />
        )}
      </Button>
    </Link>
  );
};

export default NavigationButton;
