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
import { useRef, useEffect } from "react";
import { RESPONSE_MAX_CHARACTER } from "@/constants/constants";

const GeneralQuestions = ({
  form,
  modified_general_questions,
  general_questions,
  isFetching,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  modified_general_questions: string[];
  general_questions: string[];
  isFetching: boolean;
}) => {
  const refs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (!isFetching) {
      refs.current.forEach((textarea) => {
        if (textarea) {
          textarea.style.height = "inherit";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      });
    }
  }, [isFetching]);

  return (
    <>
      <h1 className="font-bold text-2xl text-primary ">Câu hỏi chung</h1>
      {modified_general_questions.map((question, index) => (
        <FormField
          key={question}
          control={form.control}
          name={question}
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel className="text-md">
                {index + 1}. {general_questions[index]}
              </FormLabel>
              <FormControl>
                {isFetching ? (
                  <QuestionFallBack />
                ) : (
                  <Textarea
                    className="resize-none scrollbar-hide overflow-hidden"
                    value={value}
                    maxLength={RESPONSE_MAX_CHARACTER + 1}
                    ref={(el) => {
                      refs.current[index] = el;
                    }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      refs.current[index]!.style.height = "inherit";

                      refs.current[index]!.style.height = `${
                        refs.current[index]!.scrollHeight
                      }px`;
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

export default GeneralQuestions;
