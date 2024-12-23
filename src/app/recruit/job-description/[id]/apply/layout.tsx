import NavigationButton from "@/app/recruit/_components/NavigationButton";
import {ReactNode, Suspense} from "react";
import FormFallBack from "./_components/FallBacks/FormFallBack";
import {DepartmentsAbbreviation, FULL_DEPARTMENT_TITLE} from "@/app/recruit/_constants/constants";

type Params = Promise<{id: string}>;

const JobLayout = async ({children, params}: {children: ReactNode; params: Params}) => {
  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation = decodedID as DepartmentsAbbreviation;
  return (
    <>
      <div className="py-14 container !px-0">
        <NavigationButton
          href={`/recruit/job-description/${decodedID}`}
          text="Quay lại job description"
          direction="left"
        />
        <h1 className="text-bold text-3xl text-center mt-8">
          Apply Vào <span className="text-primary"> {FULL_DEPARTMENT_TITLE(department)}</span>
        </h1>
        <Suspense fallback={<FormFallBack />}>{children}</Suspense>
      </div>
    </>
  );
};

export default JobLayout;
