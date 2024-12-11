import { GetSheetData } from "@/lib/GoogleSpreadsheet";
import ApplyForm from "./_components/ApplyForm";

interface PageProps {
  params: { id: string };
}

const Applypage = async ({ params }: PageProps) => {
  const { id } = await params;
  const questions: string[][] = (await GetSheetData(id, "qs")) as string[][];
  return (
    <div className="flex items-center justify-center">
      <ApplyForm questions={questions[0]} />
    </div>
  );
};

export default Applypage;
