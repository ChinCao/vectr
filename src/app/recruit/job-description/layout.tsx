import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ReactNode } from "react";

const JobDescriptionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar>
        <Link
          href="/recruit/job-description/coding"
          className="w-full block py-3 px-3"
        >
          Coding
        </Link>
        <Link
          href="/recruit/job-description/robitics"
          className="w-full block py-3 px-3"
        >
          Robotics
        </Link>
        <Link
          href="/recruit/job-description/hc"
          className="w-full block py-3 px-3"
        >
          Hậu Cần
        </Link>
        <Link
          href="/recruit/job-description/ph"
          className="w-full block py-3 px-3"
        >
          PH
        </Link>
        <Link
          href="/recruit/job-description/pr"
          className="w-full block py-3 px-3"
        >
          PR
        </Link>
        <Link href="/recruit" className="w-full block py-3 px-3">
          Recruit
        </Link>
      </Navbar>
      {children}
    </div>
  );
};

export default JobDescriptionLayout;
