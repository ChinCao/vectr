import {Button} from "@/components/ui/button";
import Link from "next/link";

const RecruitButton = ({className, button_className}: {className?: string; button_className?: string}) => {
  return (
    <Link
      href="/recruit"
      className={`${className}`}
    >
      <Button
        className={`${button_className} w-full  py-1 bg-primary text-white hover:bg-transparent border border-primary hover:text-primary lg:rounded rounded pl-2 lg:pl-0 mx-0 lg:ml-3 !px-2 block`}
      >
        Recruit
      </Button>
    </Link>
  );
};

export default RecruitButton;
