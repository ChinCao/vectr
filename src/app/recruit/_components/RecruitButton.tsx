import Link from "next/link";

const RecruitButton = () => {
  return (
    <Link
      href="/recruit"
      className="w-full block py-1 bg-primary text-white hover:bg-transparent border border-primary hover:text-primary  lg:rounded rounded-none pl-2 lg:pl-0 mx-0 lg:ml-1 lg:mr-3 text-left lg:text-center"
    >
      Recruit
    </Link>
  );
};

export default RecruitButton;
