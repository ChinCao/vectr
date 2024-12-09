import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ReactNode } from "react";

const RecruitLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar>
        <Link href="#">Gen1</Link>
        <Link href="#value">Giá Trị</Link>
        <Link href="#core">Các Ban</Link>
        <Link href="#mission">Sứ Mệnh</Link>
        <Link href="#process">Quy Trình</Link>
      </Navbar>
      {children}
    </div>
  );
};

export default RecruitLayout;
