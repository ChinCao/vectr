import { DepartmentsAbbreviation } from "@/app/recruit/_constants/constants";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
  children: ReactNode;
}

const JobLayout = async ({ children, params }: PageProps) => {
  const valid_department = Object.values(DepartmentsAbbreviation);

  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation =
    decodedID as DepartmentsAbbreviation;
  if (!valid_department.includes(department)) {
    notFound();
  }

  return <div className="py-14 container">{children}</div>;
};

export default JobLayout;
