import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

const GeneralQuestions = ({
  form,
  modified_general_questions,
  general_questions,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  modified_general_questions: string[];
  general_questions: string[];
}) => {
  return (
    <>
      <h1 className="font-bold text-2xl text-primary ">Câu hỏi chung</h1>
      {modified_general_questions.map((question, index) => (
        <FormField
          key={question}
          control={form.control}
          name={question}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">
                {index + 1}. {general_questions[index]}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

export default GeneralQuestions;
