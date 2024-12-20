import { TabsContent, TabsList } from "@/components/ui/tabs";
import ApplyTabTrigger from "../../FormTabTrigger";
import { PersonalInfoProps } from "./Inputs/_types/PersonalProps";
import PersonalInfo from "./PersonalInfoTab";

const PersonalInfoTabContent = ({ form, isFetching }: PersonalInfoProps) => {
  return (
    <TabsContent value="personal-info" className="flex flex-col gap-4 rounded">
      <PersonalInfo form={form} isFetching={isFetching} />

      <TabsList className="w-full bg-[transparent] my-4">
        <ApplyTabTrigger
          direction="right"
          value="general-questions"
          text="Câu hỏi chung"
        />
      </TabsList>
    </TabsContent>
  );
};

export default PersonalInfoTabContent;
