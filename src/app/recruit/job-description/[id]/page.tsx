import { metadata } from "@/app/layout";
import { GetSheetData } from "@/lib/GoogleSpreadsheet";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

const JobDescription = async ({ params }: PageProps) => {
  const value_jobs = ["coding", "robotics", "ph", "pr", "hc"];
  const { id } = await params;

  if (!value_jobs.includes(id)) {
    notFound();
  }

  const full_title = () => {
    switch (id) {
      case "coding":
        return "Ban Coding";
      case "robotics":
        return "Ban Robotics";
      case "ph":
        return "Ban PH (Des)";
      case "pr":
        return "Ban PR";
      case "hc":
        return "Ban Hậu Cần";
    }
  };
  const data = await GetSheetData();
  return (
    <>
      <title>{full_title()}</title>

      <div>
        {/* <div className="">{data}</div> */}
        <div className="">{id}</div>
      </div>
    </>
  );
};

export default JobDescription;
