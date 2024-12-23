import {GetSheetData} from "@/app/recruit/_lib/GoogleUtils";
import ApplyForm from "./_components/ApplyForm";
import {DepartmentsAbbreviation, FULL_DEPARTMENT_TITLE, JOB_DESCRIPTION_TITLES} from "@/app/recruit/_constants/constants";

import type {Metadata} from "next";
import {GetSheetDataResponse} from "@/app/recruit/_lib/_types/ResponseTypes";
import ErrorMessage from "@/components/ErrorMessage";

type Params = Promise<{id: string}>;

interface PageProps {
  params: Params;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation = decodedID as DepartmentsAbbreviation;
  return {
    title: FULL_DEPARTMENT_TITLE(department),
    description: JOB_DESCRIPTION_TITLES[department],
  };
}

const Applypage = async ({params}: PageProps) => {
  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation = decodedID as DepartmentsAbbreviation;
  const department_questions: GetSheetDataResponse = await GetSheetData(department, "qs");
  const general_questions: GetSheetDataResponse = await GetSheetData("chung", "qs");

  if (department_questions.status == 500 || general_questions.status == 500) {
    return <ErrorMessage />;
  }

  if ("data" in department_questions && "data" in general_questions) {
    return (
      <>
        <div className="flex items-center justify-center">
          <ApplyForm
            department_questions={department_questions.data!}
            general_questions={general_questions.data!}
            department={department}
          />
        </div>
      </>
    );
  }
};

export default Applypage;
