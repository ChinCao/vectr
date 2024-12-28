"use client";
import Navbar from "@/app/recruit/_components/Navbar/Navbar";
import HomeSection from "./_components/HomeSection/HomeSection";
import ValuesSection from "./_components/ValuesSection/ValuesSection";
import DepartmentsSection from "./_components/DepartmentsSection/DepartmentsSection";
import MissionSection from "./_components/MissionSection/MissionSection";
import ProcessSection from "./_components/ProcessSection/ProcessSection";
import BenefitsSection from "./_components/BenefitsSection/BenefitsSection";
import AboutUsSection from "./_components/AboutUsSection/AboutUsSection";
import Anchor from "./_components/Anchor";
import RecruitButton from "./_components/RecruitButton";
import CoreSection from "./_components/CoreSection/CoreSection";

const RecruitPage = () => {
  return (
    <>
      <title>Recruit Gen1</title>
      <Navbar showRecruitBtn={false}>
        <Anchor
          href="#"
          text="Gen1"
        />
        <Anchor
          href="#benefits"
          text="Quyền lợi"
        />
        <Anchor
          href="#about"
          text="Về VECTR"
        />
        <Anchor
          href="#core"
          text="Các CORE"
        />
        <Anchor
          href="#values"
          text="Giá Trị"
        />
        <Anchor
          href="#departments"
          text="Các Ban"
        />

        <Anchor
          href="#mission"
          text="Sứ Mệnh"
        />
        <Anchor
          href="#process"
          text="Quy Trình"
        />
        <RecruitButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
        />
      </Navbar>
      <div className="flex flex-col md:items-center">
        <HomeSection />
        <BenefitsSection />
        <AboutUsSection />
        <CoreSection />
        <ValuesSection />
        <DepartmentsSection />
        <MissionSection />
        <ProcessSection />
      </div>
    </>
  );
};

export default RecruitPage;
