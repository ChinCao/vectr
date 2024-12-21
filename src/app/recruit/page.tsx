"use client";
import Navbar from "@/components/Navbar";
import HomeSection from "./_components/HomeSection/HomeSection";
import ValuesSection from "./_components/ValuesSection/ValuesSection";
import DepartmentsSection from "./_components/DepartmentsSection/DepartmentsSection";
import MissionSection from "./_components/MissionSection/MissionSection";
import ProcessSection from "./_components/ProcessSection/ProcessSection";

const RecruitPage = () => {
  return (
    <>
      <title>Recruit Gen1</title>
      <Navbar>
        <a
          href="#"
          className="w-full block py-3 px-3 "
        >
          Gen1
        </a>
        <a
          href="#values"
          className="w-full block py-3 px-3 "
        >
          Giá Trị
        </a>
        <a
          href="#departments"
          className="w-full block py-3 px-3 "
        >
          Các Ban
        </a>
        <a
          href="#benefits"
          className="w-full block py-3 px-3 "
        >
          Quyền lợi
        </a>
        <a
          href="#mission"
          className="w-full block py-3 px-3 "
        >
          Sứ Mệnh
        </a>
        <a
          href="#process"
          className="w-full block py-3 px-3 "
        >
          Quy Trình
        </a>
      </Navbar>
      <div className="flex flex-col items-center">
        <HomeSection />
        <ValuesSection />
        <DepartmentsSection />
        <MissionSection />
        <ProcessSection />
      </div>
    </>
  );
};

export default RecruitPage;
