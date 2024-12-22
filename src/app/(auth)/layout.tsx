import Navbar from "@/components/Navbar";
import {ReactNode} from "react";
import RecruitButton from "../recruit/_components/RecruitButton";

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar>
        <RecruitButton />
      </Navbar>
      <div className="pt-28 pb-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
