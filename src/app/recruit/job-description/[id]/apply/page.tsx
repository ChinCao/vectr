import { GetSheetData } from "@/lib/GoogleSpreadsheet";
import ApplyForm from "./_components/ApplyForm";

interface PageProps {
  params: { id: string };
}

const Applypage = async ({ params }: PageProps) => {
  const { id } = await params;
  const response: string[][] = (await GetSheetData(id, "qs")) as string[][];

  return (
    <div className="flex items-center justify-center">
      <ApplyForm
        data={response[0].map((str) => str.replace(/["'`]/g, ""))}
        question_title={response[0]}
      />
    </div>
  );
};

export default Applypage;
