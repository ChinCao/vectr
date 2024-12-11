import NavigationButton from "@/app/recruit/_components/NavigationButton";
import { ReactNode, Suspense } from "react";
import FormFallBack from "./_components/FormFallBack";
import { FULL_CORE_TITLE } from "@/constants/constants";

const JobLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const { id } = await params;

  return (
    <div className="py-14 container">
      <NavigationButton
        href={`/recruit/job-description/${id}`}
        text="Quay lại job description"
        direction="left"
      />
      <h1 className="text-bold text-3xl text-center mt-8">
        Apply Vào <span className="text-primary"> {FULL_CORE_TITLE(id)}</span>
      </h1>
      <Suspense fallback={<FormFallBack />}>{children}</Suspense>
    </div>
  );
};

export default JobLayout;
