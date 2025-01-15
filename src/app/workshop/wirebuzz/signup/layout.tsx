import Navbar from "@/components/Navbar/Navbar";
import {ReactNode} from "react";

const WorkshopSignupLayout = async ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-[#faeddb] dark:bg-black">
      <Navbar
        showSpotlightButton={true}
        spotLightButtonHref="/workshop/wirebuzz/signup"
        spotlightButtonButtonText="Wirebuzz"
      >
        <h1>Recruit</h1>
      </Navbar>
      {children}
    </div>
  );
};

export default WorkshopSignupLayout;
