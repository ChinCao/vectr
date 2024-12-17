import { createDocumentInDrive } from "@/lib/GoogleSpreadsheet";

const page = async () => {
  const skibidi: any = await createDocumentInDrive("skibidi_sigma");
  console.log("aaaaaaa");

  return <div>page</div>;
};

export default page;
