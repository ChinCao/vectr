import {DEPARTMENT_INFO, DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";
import {notFound} from "next/navigation";
import {ReactNode} from "react";
import JDNavItems from "../_components/JDNavItems";
import NavSpotlighButton from "../../../../components/NavSpotlighButton";
import Navbar from "@/components/Navbar/Navbar";

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
      <Navbar
        showSpotlightButton={true}
        spotLightButtonHref="/recruit"
        spotlightButtonButtonText="Recruit"
      >
        {DEPARTMENT_INFO.map((info, index) => (
          <JDNavItems
            key={index}
            info={info}
            index={index}
            department={department}
          />
        ))}
        <NavSpotlighButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
          text="Recruit"
          href="/recruit"
        />
      </Navbar>
      <div className="py-14 container">{children}</div>
    </>
  );
};

export default JobLayout;
