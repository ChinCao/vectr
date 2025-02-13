import {
  DEPARTMENT_ICON,
  DepartmentsAbbreviation,
  FORM_CLOSE_DAY,
  FULL_DEPARTMENT_TITLE,
  JOB_DESCRIPTION_TITLES,
} from "@/app/recruit/_constants/constants";
import NavigationButton from "../../_components/NavigationButton";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Description from "./_components/Description";
import {Suspense} from "react";
import DescriptionFallBack from "./_components/DescriptionFallBack";
import ApplyButton from "./_components/ApplyButton";
import Countdown from "@/components/Countdown";
import {Metadata} from "next";

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

const JobDescription = async ({params}: PageProps) => {
  const id = (await params).id;
  const decodedID = decodeURI(id);
  const department: DepartmentsAbbreviation = decodedID as DepartmentsAbbreviation;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex bg-gray-100 dark:bg-gray-800 w-[100vw]">
          <div className="container flex flex-col md:flex-row md:gap-2 pt-14 pb-8 items-center justify-center">
            <div className="flex flex-col items-center md:items-start gap-4 w-[90%] md:w-[50%] order-1 md:order-[0] ">
              <h1 className="text-3xl font-semibold mt-4 md:mt-0 text-center">{FULL_DEPARTMENT_TITLE(department)}</h1>
              <p className="text-gray-500 w-[90%] text-justify md:text-left font-normal">{JOB_DESCRIPTION_TITLES[department]}</p>
              <div className="flex gap-5 flex-col md:flex-row w-full">
                <NavigationButton
                  href="/recruit/job-description"
                  text="Chọn ban khác"
                  direction="left"
                  className="w-full md:w-[max-content]"
                  button_className="w-full md:w-[max-content]"
                />
                <ApplyButton id={department}>
                  <Button className="bg-primary-yellow text-foreground w-full md:w-[max-content] active:scale-[0.985]">Apply ban này</Button>
                </ApplyButton>
              </div>
            </div>
            <Image
              className="order-[0] md:order-1"
              src={DEPARTMENT_ICON[department as keyof typeof DEPARTMENT_ICON][1]}
              alt="Graphic"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-2 w-[100%] sm:max-w-[800px]">
          <Countdown
            targetDate={FORM_CLOSE_DAY}
            countdownTitle="Countdown vòng gửi đơn kết thúc"
            expiredText="Vòng gửi đơn đã kết thúc"
          />
          <Suspense fallback={<DescriptionFallBack />}>
            <Description id={department} />
          </Suspense>
          <ApplyButton id={department}>
            <Button className="bg-primary-yellow text-foreground mt-8 sm:min-w-[500px] min-w-full active:scale-[0.985]">Apply ban này</Button>
          </ApplyButton>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
