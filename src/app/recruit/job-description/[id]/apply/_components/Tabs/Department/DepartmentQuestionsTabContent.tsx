import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import ApplyTabTrigger from "../../FormTabTrigger";
import DepartmentQuestions from "./DepartmentQuestionTab";
import { UseFormReturn } from "react-hook-form";

const DepartmentQuestionsTabContent = ({
  form,
  department_questions,
  isFetching,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  department_questions: string[][];
  isFetching: boolean;
}) => {
  return (
    <TabsContent value="department-questions" className="flex flex-col gap-4">
      <DepartmentQuestions
        form={form}
        isFetching={isFetching}
        department_questions={department_questions}
      />
      <TabsList className="w-full flex flex-col gap-5 my-4 bg-[transparent]">
        <ApplyTabTrigger
          direction="left"
          value="general-questions"
          text="Câu hỏi chung"
        />
        <ApplyTabTrigger
          direction="left"
          value="personal-info"
          text="Thông tin cá nhân"
        />
      </TabsList>
    </TabsContent>
  );
};

export default DepartmentQuestionsTabContent;
