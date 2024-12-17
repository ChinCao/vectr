import { GetSheetData } from "@/lib/GoogleSpreadsheet";
import ApplyForm from "./_components/ApplyForm";

interface PageProps {
  params: { id: string };
}

const Applypage = async ({ params }: PageProps) => {
  const { id } = await params;
  const decodedID = decodeURI(id);
  const department_questions: string[][] = (await GetSheetData(
    decodedID,
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
        department={decodedID}
      />
    </div>
  );
};

export default Applypage;
