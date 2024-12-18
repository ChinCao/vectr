import { DEPARTMENT_INFO } from "@/constants/RecruitConstants";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface PageProps {
  params: { id: string };
  children: ReactNode;
}

const JobLayout = async ({ children, params }: PageProps) => {
  const valid_department = DEPARTMENT_INFO.map(
    (department) => department.abbreviation
  );

  const { id } = await params;
  const decodedID = decodeURI(id);
  if (!valid_department.includes(decodedID)) {
    notFound();
  }

  return <div className="py-14 container">{children}</div>;
};

export default JobLayout;
