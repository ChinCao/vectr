import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import ApplyTabTrigger from "../../FormTabTrigger";
import GeneralQuestions from "./GeneralQuestionsTab";
import { UseFormReturn } from "react-hook-form";

const GeneralQuestionsTabContent = ({
  form,
  general_questions,
  isFetching,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  general_questions: string[][];
  isFetching: boolean;
}) => {
  return (
    <TabsContent value="general-questions" className="flex flex-col gap-8">
      <GeneralQuestions
        form={form}
        general_questions={general_questions}
        isFetching={isFetching}
      />
      <TabsList className="w-full flex flex-col gap-5 my-4 bg-[transparent]">
        <ApplyTabTrigger
          direction="right"
          value="department-questions"
          text="Câu hỏi chuyên môn"
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

export default GeneralQuestionsTabContent;
