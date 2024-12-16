import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import QuestionFallBack from "./QuestionFallBack";

const DepartmentQuestions = ({
  form,
  modified_department_questions,
  department_questions,
  isFetching,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  modified_department_questions: string[];
  department_questions: string[];
  isFetching: boolean;
}) => {
  return (
    <>
      <h1 className="font-bold text-2xl text-primary ">Câu hỏi chuyên môn</h1>
      {modified_department_questions.map((question, index) => (
        <FormField
          key={question}
          control={form.control}
          name={question}
          render={({ field: { onChange, value, ref } }) => (
            <FormItem>
              <FormLabel className="text-md">
                {index + 1}. {department_questions[index]}
              </FormLabel>
              <FormControl>
                {isFetching ? (
                  <QuestionFallBack />
                ) : (
                  <Textarea
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

export default DepartmentQuestions;
