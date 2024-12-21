import {
  CORE_IMAGE,
  DepartmentsAbbreviation,
  FULL_DEPARTMENT_TITLE,
  JOB_DESCRIPTION_TITLES,
} from "@/app/recruit/_constants/constants";
import NavigationButton from "../../_components/NavigationButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Description from "./_components/Description";
import { Suspense } from "react";
import DescriptionFallBack from "./_components/DescriptionFallBack";
import ApplyButton from "./_components/ApplyButton";

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

const JobDescription = async ({ params }: PageProps) => {
  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation =
    decodedID as DepartmentsAbbreviation;

  return (
    <>
      <title>{FULL_DEPARTMENT_TITLE(department)}</title>
      <div className="flex flex-col items-center">
        <div className="flex bg-gray-100 w-[100vw]">
          <div className="container flex flex-col md:flex-row md:gap-2 pt-14 pb-8 items-center justify-center">
            <div className="flex flex-col items-center md:items-start gap-5 w-[90%] md:w-[50%] order-1 md:order-[0] ">
              <h1 className="text-3xl font-semibold mt-4 md:mt-0 text-center">
                {FULL_DEPARTMENT_TITLE(department)}
              </h1>
              <p className="text-gray-500 w-[90%] font-semibold text-justify md:text-left">
                {JOB_DESCRIPTION_TITLES[department]}
              </p>
              <div className="flex gap-5 flex-col md:flex-row w-full">
                <NavigationButton
                  href="/recruit/job-description"
                  text="Chọn ban khác"
                  direction="left"
                  className="w-full md:w-[max-content]"
                  button_className="w-full md:w-[max-content]"
                />
                <ApplyButton id={department}>
                  <Button className="bg-[#f7c325] text-black w-full md:w-[max-content] active:scale-[0.985]">
                    Apply ban này
                  </Button>
                </ApplyButton>
              </div>
            </div>
            <Image
              className="order-[0] md:order-1"
              src={CORE_IMAGE[department as keyof typeof CORE_IMAGE][1]}
              alt="Graphic"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-10 max-w-[800px]">
          <Suspense fallback={<DescriptionFallBack />}>
            <Description id={department} />
          </Suspense>
          <ApplyButton id={department}>
            <Button className="bg-[#f7c325] text-black sm:min-w-[500px] min-w-full active:scale-[0.985]">
              Apply ban này
            </Button>
          </ApplyButton>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
