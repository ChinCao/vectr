import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import {ReactNode} from "react";

const WorkshopSignupLayout = async ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-[#faeddb] dark:bg-black">
      <Navbar
        showSpotlightButton={true}
        spotLightButtonHref="/workshop/wirebuzz/signup"
        spotlightButtonButtonText="Wirebuzz"
      >
        <Link
          href="/"
          className="w-full block py-3 px-3 font-normal hover:text-primary"
        >
          <h1>Trang chủ</h1>
        </Link>
        <Link
          href="/recruit"
          className="w-full block py-3 px-3 font-normal hover:text-primary"
        >
          <h1>Recruit</h1>
        </Link>
      </Navbar>
      {children}
    </div>
  );
};

export default WorkshopSignupLayout;
