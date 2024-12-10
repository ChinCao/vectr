import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <title>Trang chủ</title>
      <Navbar>
        <Link href="/recruit" className="w-full block py-3 px-3">
          Recruit
        </Link>
      </Navbar>
      <div className="min-h-screen flex flex-col items-center justify-center gap-1">
        <Image
          src="/advanced-science-long-set-tkpOtZ.png"
          height={150}
          width={150}
          alt="VECTR Logo"
        />
        <h1 className="font-semibold text-3xl text-center">Coming soon ...</h1>
        <Link href="/recruit" className="mt-4">
          <Button>Quay trở lại trang recruit</Button>
        </Link>
      </div>
    </>
  );
}
