import {ReactNode} from "react";
import NavSpotlighButton from "../../components/NavSpotlighButton";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
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
        <NavSpotlighButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
          text="Wirebuzz"
          href="/workshop/wirebuzz/signup"
        />
      </Navbar>
      <div className="pt-28 pb-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
