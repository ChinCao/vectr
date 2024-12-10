import { CORE_IMAGE, FULL_CORE_TITLE } from "@/constants/constants";
import { GetSheetData } from "@/lib/GoogleSpreadsheet";
import { notFound } from "next/navigation";
import NavigationButton from "../../_components/NavigationButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

const JobDescription = async ({ params }: PageProps) => {
  const value_jobs = ["coding", "robotics", "ph", "pr", "hc"];
  const { id } = await params;

  if (!value_jobs.includes(id)) {
    notFound();
  }

  const description_data: string[][] = await GetSheetData(id, "jd");

  return (
    <>
      <title>{FULL_CORE_TITLE(id)}</title>
      <div className="flex flex-col items-center">
        <div className="flex bg-gray-100 w-[100vw]">
          <div className="container flex flex-col md:flex-row md:gap-6 pt-14 pb-8 items-center justify-center">
            <div className="flex flex-col items-center md:items-start gap-5 w-[90%] md:w-[40%] order-1 md:order-[0] ">
              <h1 className="text-3xl font-semibold">{FULL_CORE_TITLE(id)}</h1>
              <p className="text-gray-500 w-[90%] font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                voluptatibus quasi nobis officia natus ipsa.
              </p>
              <div className="flex gap-5 flex-col md:flex-row w-full">
                <NavigationButton
                  href="/recruit/job-description"
                  text="Chọn ban khác"
                  direction="left"
                  className="w-full md:w-[max-content]"
                  button_className="w-full md:w-[max-content]"
                />
                <Link href={`/recruit/job-description/${id}/apply`}>
                  <Button className="bg-[#f7c325] text-black">
                    Apply ban này
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              className="order-[0] md:order-1"
              src={CORE_IMAGE[id as keyof typeof CORE_IMAGE][1]}
              alt="Graphic"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-10 max-w-[800px]">
          <div className="pt-4  flex flex-col gap-y-16 items-start justify-center">
            {description_data.map((data: string[]) => {
              return (
                <div
                  className="flex flex-col items-start justify-center"
                  key={data[0]}
                >
                  <h1 className="text-2xl font-semibold mb-3">{data[0]}</h1>
                  <ul className="flex flex-col gap-2">
                    {data.slice(1).map((item, index) => (
                      <li
                        key={index}
                        className="relative before:content-[''] before:block before:w-[3px] before:h-[3px] before:bg-current before:absolute before:right-[102%] before:top-[25%] sm:before:top-[50%] font-light"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <Link
            href={`/recruit/job-description/${id}/apply`}
            className="w-full flex items-center justify-center"
          >
            <Button className="bg-[#f7c325] text-black w-full md:w-[50%]">
              Apply ban này
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
