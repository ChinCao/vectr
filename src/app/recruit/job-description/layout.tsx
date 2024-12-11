import Navbar from "@/components/Navbar";
import { DEPARTMENT_INFO } from "@/constants/constants";
import Link from "next/link";
import { ReactNode } from "react";

const JobDescriptionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <Navbar>
        {DEPARTMENT_INFO.map((info, index) => (
          <Link
            key={index}
            href={info["url"]}
            className="w-full block py-3 px-3"
          >
            {info["abbreviation"].toUpperCase()}
          </Link>
        ))}
        <Link href="/recruit" className="w-full block py-3 px-3">
          Recruit
        </Link>
      </Navbar>
      {children}
    </div>
  );
};

export default JobDescriptionLayout;
