import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar>
        <Link href="/recruit" className="w-full block py-3 px-3">
          Recruit
        </Link>
      </Navbar>
      <div className="pt-28 pb-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
