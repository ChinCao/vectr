"use client";
import HomeSection from "./_components/HomeSection/HomeSection";
import ValuesSection from "./_components/ValuesSection/ValuesSection";
import DepartmentsSection from "./_components/DepartmentsSection/DepartmentsSection";
import MissionSection from "./_components/MissionSection/MissionSection";
import ProcessSection from "./_components/ProcessSection/ProcessSection";
import BenefitsSection from "./_components/BenefitsSection/BenefitsSection";
import AboutUsSection from "./_components/AboutUsSection/AboutUsSection";
import Anchor from "./_components/Anchor";
import CoreSection from "./_components/CoreSection/CoreSection";
import {useMemo} from "react";
import NavSpotlighButton from "../../components/NavSpotlighButton";
import Navbar from "@/components/Navbar/Navbar";

const RecruitPage = () => {
  return (
    <>
      <title>Recruit Gen1</title>
      <Navbar showSpotlightButton={false}>
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
        <NavSpotlighButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
          text="Recruit"
          href="/recruit"
        />
      </Navbar>
      <div className="flex flex-col md:items-center">
        {useMemo(
          () => (
            <HomeSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <BenefitsSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <AboutUsSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <CoreSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <ValuesSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <DepartmentsSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <MissionSection />
          ),
          []
        )}
        {useMemo(
          () => (
            <ProcessSection />
          ),
          []
        )}
      </div>
    </>
  );
};

export default RecruitPage;
