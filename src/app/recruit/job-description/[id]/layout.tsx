import {DEPARTMENT_INFO, DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";
import Navbar from "@/components/Navbar";
import {notFound} from "next/navigation";
import {ReactNode} from "react";
import Link from "next/link";
import RecruitButton from "../../_components/RecruitButton";

type Params = Promise<{id: string}>;

interface PageProps {
  params: Params;
  children: ReactNode;
}

const JobLayout = async ({children, params}: PageProps) => {
  const valid_department = Object.values(DepartmentsAbbreviation);

  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation = decodedID as DepartmentsAbbreviation;
  if (!valid_department.includes(department)) {
    notFound();
  }

  return (
    <>
      <Navbar showRecruitBtn={true}>
        {DEPARTMENT_INFO.map((info, index) => (
          <Link
            key={index}
            href={info["url"]}
            className="w-full block py-3 px-3 font-normal"
            style={{
              borderBottom: info["abbreviation"] == department ? "1px solid #e77f1e" : "",
            }}
          >
            <h1 style={{color: info["abbreviation"] == department ? "#e77f1e" : ""}}>{info["abbreviation"].toUpperCase()}</h1>
          </Link>
        ))}
        <RecruitButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
        />
      </Navbar>
      <div className="py-14 container">{children}</div>
    </>
  );
};

export default JobLayout;
