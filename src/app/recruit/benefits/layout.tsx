import Navbar from "@/components/Navbar";
import {ReactNode} from "react";
import RecruitButton from "../_components/RecruitButton";

const BenefitsLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <Navbar>
        <RecruitButton />
      </Navbar>
      {children}
    </div>
  );
};

export default BenefitsLayout;
