import { GetSheetData } from "@/app/recruit/_lib/GoogleUtils";
import ApplyForm from "./_components/ApplyForm";
import { DepartmentsAbbreviation } from "@/app/recruit/_constants/constants";

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

const Applypage = async ({ params }: PageProps) => {
  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation =
    decodedID as DepartmentsAbbreviation;
  const department_questions: string[][] = (await GetSheetData(
    department,
    "qs"
  )) as string[][];
  const general_questions: string[][] = (await GetSheetData(
    "chung",
    "qs"
  )) as string[][];

  return (
    <div className="flex items-center justify-center">
      <ApplyForm
        department_questions={department_questions}
        general_questions={general_questions}
        department={department}
      />
    </div>
  );
};

export default Applypage;
