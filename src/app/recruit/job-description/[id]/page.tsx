import { CORE_IMAGE, FULL_CORE_TITLE } from "@/constants/constants";
import NavigationButton from "../../_components/NavigationButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Description from "./_components/Description";
import { Suspense } from "react";
import DescriptionFallBack from "./_components/DescriptionFallBack";
import ApplyButton from "./_components/ApplyButton";

interface PageProps {
  params: { id: string };
}

const JobDescription = async ({ params }: PageProps) => {
  const { id } = await params;
  const decodedID = decodeURI(id);

  return (
    <>
      <title>{FULL_CORE_TITLE(decodedID)}</title>
      <div className="flex flex-col items-center">
        <div className="flex bg-gray-100 w-[100vw]">
          <div className="container flex flex-col md:flex-row md:gap-6 pt-14 pb-8 items-center justify-center">
            <div className="flex flex-col items-center md:items-start gap-5 w-[90%] md:w-[40%] order-1 md:order-[0] ">
              <h1 className="text-3xl font-semibold">
                {FULL_CORE_TITLE(decodedID)}
              </h1>
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
                <ApplyButton id={decodedID}>
                  <Button className="bg-[#f7c325] text-black w-full md:w-[max-content]">
                    Apply ban này
                  </Button>
                </ApplyButton>
              </div>
            </div>
            <Image
              className="order-[0] md:order-1"
              src={CORE_IMAGE[decodedID as keyof typeof CORE_IMAGE][1]}
              alt="Graphic"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-10 max-w-[800px]">
          <Suspense fallback={<DescriptionFallBack />}>
            <Description id={decodedID} />
          </Suspense>
          <ApplyButton id={decodedID}>
            <Button className="bg-[#f7c325] text-black sm:min-w-[500px] min-w-full ">
              Apply ban này
            </Button>
          </ApplyButton>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
