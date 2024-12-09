import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const JobDescriptionButton = ({ className }: { className?: string }) => {
  return (
    <Button className={`w-[max-content] ${className}`}>
      <Link
        href="/recruit/job-description"
        className="flex items-center justify-center gap-2"
      >
        Xem Job Description <FaLongArrowAltRight color="white" />
      </Link>
    </Button>
  );
};

export default JobDescriptionButton;
