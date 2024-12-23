import {GetSheetData} from "@/app/recruit/_lib/GoogleUtils";
import ApplyForm from "./_components/ApplyForm";
import {DepartmentsAbbreviation, FULL_DEPARTMENT_TITLE, JOB_DESCRIPTION_TITLES} from "@/app/recruit/_constants/constants";

import type {Metadata} from "next";

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
  const department_questions: string[][] = (await GetSheetData(department, "qs")) as string[][];
  const general_questions: string[][] = (await GetSheetData("chung", "qs")) as string[][];

  return (
    <>
      <div className="flex items-center justify-center">
        <ApplyForm
          department_questions={department_questions}
          general_questions={general_questions}
          department={department}
        />
      </div>
    </>
  );
};

export default Applypage;
