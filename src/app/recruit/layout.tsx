import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const RecruitLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar>
        <a href="#">Gen1</a>
        <a href="#value">Giá Trị</a>
        <a href="#core">Các Ban</a>
        <a href="#mission">Sứ Mệnh</a>
        <a href="#process">Quy Trình</a>
      </Navbar>
      {children}
    </div>
  );
};

export default RecruitLayout;
