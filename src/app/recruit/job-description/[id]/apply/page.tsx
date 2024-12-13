import { GetSheetData } from "@/lib/GoogleSpreadsheet";
import ApplyForm from "./_components/ApplyForm";
import ConnectDB from "@/db/db";

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
  ConnectDB();
  return (
    <div className="flex items-center justify-center">
      <ApplyForm
        department_questions={department_questions[0]}
        general_questions={general_questions[0]}
      />
    </div>
  );
};

export default Applypage;
