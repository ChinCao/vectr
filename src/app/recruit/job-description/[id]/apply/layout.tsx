import NavigationButton from "@/app/recruit/_components/NavigationButton";
import { ReactNode, Suspense } from "react";
import FormFallBack from "./_components/FormFallBack";
import { FULL_CORE_TITLE } from "@/constants/RecruitConstants";

type Params = Promise<{ id: string }>;

const JobLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  const id = (await params).id;
  const decodedID = decodeURI(id);

  return (
    <div className="py-14 container">
      <NavigationButton
        href={`/recruit/job-description/${decodedID}`}
        text="Quay lại job description"
        direction="left"
      />
      <h1 className="text-bold text-3xl text-center mt-8">
        Apply Vào{" "}
        <span className="text-primary"> {FULL_CORE_TITLE(decodedID)}</span>
      </h1>
      <Suspense fallback={<FormFallBack />}>{children}</Suspense>
    </div>
  );
};

export default JobLayout;
